---
title: 'Asserting errors from throwing functions'
slug: 'asserting-errors-from-throwing-functions'
excerpt: 'Looking at how to use expecations and XCTAssertThrowsError to assert specific errors are being thrown in Swift.'
pubDate: '2022-01-16'
readtime: '4'
tags:
  [{ name: 'Testing', slug: 'testing' }, { name: 'Swift', slug: 'swift' }]
author:
  name: 'Pol Piella'
layout: ../layouts/BlogPostLayout.astro
---

A very common scenario when designing and testing APIs in Swift is to use `throw`ing functions and, in our test context asserting that, given some conditions, an error is thrown. Thankfully, while it might not be obvious how to do this at first, it is easy to achieve using the `XCTest` framework that we are all familiar with. In this article, I will give a brief overview of two techniques to approach this case case, how they work and why I think `XCTAssertThrowsError` is the simplest and most explicit way of testing these kind of situations. But before we dive right into writing some tests, let's first take a look at the system we'll be testing.

## The system under test

The code we'll be testing consists of a single function which validates that the fields in a sign up form are not empty. It takes in three arguments: an email, a username and a password - these are primitive type representations of the values held in each form field - and it returns `true` **if none of the fields are empty** or throws an error **if any of them are**.

You will notice that the error being thrown is a custom `ValidationError` enum with a single case `validationFailed`. In turn, this has an array of `FieldError`s as an associated value. The reason for this design is that we want to collect multiple errors and throw them all at once, rather than throwing an individual error per field. This will allow the client code to get **all of the errors at once** without having to fix, re-run, then fix again if there are multiple failures.

```swift:Validator.swift
enum ValidationError: Error, Equatable {
    case validationFailed([FieldError])

    enum FieldError: Error {
        case password
        case email
        case username
    }
}

func validate(email: String, username: String, password: String) throws -> Bool {
    let errors = [
        (email, ValidationError.FieldError.email),
        (password, .password),
        (username, .username)
    ]
        .filter { $0.0.isEmpty }
        .map { $0.1 }

    guard errors.isEmpty else { throw ValidationError.validationFailed(errors) }
    return true
}
```

In the following sections we will be looking at two different techniques to assert that the `validate` function throws an error on failure and that it throws the correct error.

## Expectations

A technique which checks that the function throws a specific error is to use `XCTestExpectation`s. We can do this by defining our expectation at the beginning of the test function and then doing a `do/catch` to `try` and run the `validate` function.

We can then write `catch` blocks, one targetting the error we're expecting to be thrown (`ValidationError.validationFailed([.email])`), where we will **fulfill the expectation**. We can then write another catch block targetting any other error where we will make sure that the test fails using the `XCTFail` type. This ensures that we only fulfill the expectation if the right error is thrown and fail if **no/unexpected errors** are thrown.

The `wait(for:timeout:)` function can then be used to wait for the expectation to fulfill with a timeout of 0 seconds, as it is a synchronous operation.

```swift:ValidatorTests.swift
func testWhenValidatingAFormWithEmptyEmail_ThenAValidationFailedEmailErrorIsThrown() {
    let expectation = expectation(description: "Should have thrown an email validation failed error")
    do {
        _  = try validate(
            email: "",
            username: "polpielladev",
            password: "blog-post"
        )
    } catch ValidationError.validationFailed([.email]) {
        expectation.fulfill()
    } catch let error {
        XCTFail("Should not have thrown error: '\(error.localizedDescription)'")
    }
    wait(for: [expectation], timeout: 0)
}
```

If we run the test above, we'll see that the expectation gets fulfilled because an email validation error was thrown - remember the validate function throws a `FieldError` for each empty field and in this case only the email is empty. Try modifying the arguments in the `validate` function and seeing how it affects the test.

This pattern does the job very well and covers our test case, but as we can see in the example above, it can get a little verbose. It requires a fair bit of boilerplate code such as defining the expectation, writing the catch blocks, providing a safeguard for unhandled errors and waiting for the expectation itself.

## XCTAssertThrowsError

Another way to achieve the same result as with expectations, but with a much more concise and declarative syntax, is to use one of the lesser used APIs in XCTest - `XCTAssertThrowsError`. In particular, we will the flavour seen in the snippet below, which takes advantage of the second parameter of the function to perform assertions on the error being thrown by the function under test. This parameter is a closure of type `(Error) -> Void` which allows you to perform any operations on the error that was thrown. I have to admit I was not aware this closure existed until fairly recently, so I am partly writing this article as a note for my future-self 😅.

What we need to do to perform this test is to call `XCTAssertThrowsError` and pass in the call to `try validate`. Then, using a trailing closure as the second parameter, we can perform assertions on the error being thrown.

```swift:ValidatorTests.swift
func testWhenValidatingAFormWithEmptyEmail_ThenAValidationFailedEmailErrorIsThrown() {
    XCTAssertThrowsError(
        try validate(
            email: "",
            username: "polpielladev",
            password: "blog-post"
        )
    ) { error in
        XCTAssertEqual(
            error as? ValidationError,
            .validationFailed([.email])
        )
    }
}
```

There is one thing to note about the example above and it is that I had to write an extension on `ValidationError` to make it conform to `Equatable`. I like to do this in the test context itself and not in the type declaration code if the conformance is only required for assertions in unit tests. An equatable-less version of the same code can be found below by making use of `guard case`:

```swift:ValidatorTests.swift
func testWhenValidatingAFormWithEmptyEmail_ThenAValidationFailedEmailErrorIsThrown() {
    XCTAssertThrowsError(
        try validate(
            email: "",
            username: "polpielladev",
            password: "blog-post"
        )
    ) { error in
        guard case .validationFailed([.email]) = error as? ValidationError else {
            XCTFail("Should have thrown an email validation failed error"))
            return
        }
    }
}
```
