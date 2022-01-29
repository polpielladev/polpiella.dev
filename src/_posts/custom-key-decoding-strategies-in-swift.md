---
title: "Custom key decoding strategies in Swift"
excerpt: "How to take advantage of the custom key decoding strategies to avoid unnecessary CodingKeys implementations"
slug: "custom-key-decoding-strategies-in-swift"
date: "2021-11-03T19:54:39.000Z"
readtime: "7"
tags:
    [
        { name: "Swift", slug: "swift" },
    ]
author:
    name: "Pol Piella"
---

One of my favorite Swift features is the `Codable` protocol and how easy it makes the job of parsing files, responses and dictionaries into suitable data structures. One of the most common usages of it, which is engrained in my day-to-day activities as an iOS developer, is to decode JSON responses that come back from an API. Most APIs use a [snake case format](https://en.wikipedia.org/wiki/Snake_case) when declaring keys in an object and, if we try to decode our Swift structure (where the convention is to use [camel case format](https://en.wikipedia.org/wiki/Camel_case) when declaring variables), we will see that it will give us a decoding error, as the naming will mismatch. Let's look at a very simple API response:

```json
{
    "created_at": "2021-11-03T03:58:39.653Z",
    "name": "Joe Bloggs",
    "avatar": "https://cdn.fakercloud.com/avatars/hugomano_128.jpg",
    "id": "1"
}
```

And its Swift counterpart `Decodable` struct:

```swift
struct User: Decodable {
    let createdAt: String
    let name: String
    let avatar: String
    let id: String
}
```

What we will see if we try and decode our response using a `JSONDecoder` is that the process will fail, as the `created_at` key from the JSON response does not have an equivalent variable with a matching name in its Swift counterpart. How do we fix this? Well, we have two ways of doing so: implementing `CodingKeys` or defining a custom key decoding strategy when creating our `JSONDecoder`.

Let's also test-drive our approach, by creating a very simple `XCTestCase` with a single failing test to start with that we can then make adjustments to and verify our approach is working as expected.

```swift
import XCTest

struct Parser {
    static let decoder = JSONDecoder()

    static func parse(_ data: Data) throws -> User {
        try decoder.decode(User.self, from: data)
    }
}

class KeyDecodingStrategiesTests: XCTestCase {
    func testParserDecodesJsonStringCorrectly() throws {
        let json = """
        {
            "created_at": "2021-11-03T03:58:39.653Z",
            "name": "Joe Bloggs",
            "avatar": "https://cdn.fakercloud.com/avatars/hugomano_128.jpg",
            "id": "1"
        }
        """

        let user = try Parser.parse(json.data(using: .utf8)!)

        XCTAssertEqual(user.createdAt, "2021-11-03T03:58:39.653Z")
        XCTAssertEqual(user.avatar, "https://cdn.fakercloud.com/avatars/hugomano_128.jpg")
        XCTAssertEqual(user.name, "Joe Bloggs")
        XCTAssertEqual(user.id, "1")
    }
}
```

When we run the test, we can see that we get a failure, as the variable `createdAt` does not match any of the keys in the response.

## Using CodingKeys

`CodingKeys` is a special nested `enum` type that can be included in a `Codable` entity and it provides a list of properties that the response must include to be able to successfully decode successfully. It has to conform to the `CodingKey` protocol and is very useful as it allows us to ignore certain values from the response and provide the equivalent response name for a given codable variable by conforming to the `String` protocol. Let's take a look at how we can make our above example work by using `CodingKeys`:

```swift
struct User: Decodable {
    let createdAt: String
    let name: String
    let avatar: String
    let id: String

    private enum CodingKeys: String, CodingKey {
        case createdAt = "created_at"
        case name
        case avatar
        case id
    }
}
```

After running the test again, we get no failures, which means that this approach fixes our problem but, as you can see, it requires us to add all of the keys we want to decode to that same enum. While this is fine for small files/responses, it can make your structs pretty lengthy when dealing with very big responses. Fear not though! There is another approach we can use to achieve the same result by changing the key decoding strategy.

## Key Decoding Strategies

Swift provides a way to customise the way that `JSONDecoder` parses the keys for a given input based on the variables defined in our `Codable` struct. This can be modified by using the `keyDecodingStrategy` variable in the decoder, which can have three possible values:

-   `useDefaultKeys`: It is the default value for this property and does not modify the key names during the decoding process.
-   `custom`: Takes in a closure in which you can provide a custom key modifications strategy during the decoding process.
-   `convertFromSnakeCase`: Converts the keys from snake case format to their equivalent camel case representation.

From the three enum values above, we can quickly see that there is a setting for the issue we had above, which is `convertFromSnakeCase`. Let's look at how we would go about implementing taking a simple `Parser` struct as an example:

```swift
struct User: Decodable {
    let createdAt: String
    let name: String
    let avatar: String
    let id: String
}

struct Parser {
    static let snakeCaseJSONDecoder: JSONDecoder = {
        let decoder = JSONDecoder()
        decoder.keyDecodingStrategy = .convertFromSnakeCase
        return decoder
    }()

    static func parse(_ data: Data) throws -> User {
        try snakeCaseJSONDecoder.decode(User.self, from: data)
    }
}
```

Running the tests again with the above changes also results in no failures, which means that a custom decoder can achieve the same result without the need of creating the nested enumeration and mapping keys to their JSON equivalents.

While this works great for converting from snake case to camel case, what happens if we have any other format? Can we use the same approach then? Or are we restricted to the `CodingKeys` approach? The answer is in the `custom` decoding strategy, which gives you an option to design any custom key modification strategy.

## Custom Key Decoding Strategies

Let's now consider a variation on the response coming back from the server:

```json
{
    "Created At": "2021-11-03T03:58:39.653Z",
    "Name": "Joe Bloggs",
    "Avatar": "https://cdn.fakercloud.com/avatars/hugomano_128.jpg",
    "Id": "1"
}
```

What we need to be able to decode this response, as we did above, is to modify the decoding strategy for the keys to be modified to Swift's camel case convention. We cannot use the two default decoding strategies, so we must implement a custom one.

The `custom` enum case has an associated value which consists of a closure of type `([CodingKey]) -> CodingKey`, with the coding keys to be modified as an input array and the resulting coding key as a return value. Knowing this, let's implement our new decoding strategy which turns the keys above into camel case by removing all whitespaces and converting the first letter in the key to lowercase:

```swift

struct Parser {
    struct CustomKey: CodingKey {
        var stringValue: String
        var intValue: Int?

        init?(stringValue: String) {
            self.stringValue = stringValue
        }

        init?(intValue: Int) {
            self.intValue = intValue
            self.stringValue = ""
        }
    }

    static let customJSONDecoder: JSONDecoder = {
        let decoder = JSONDecoder()
        decoder.keyDecodingStrategy = .custom { codingKeys in
            guard let key = codingKeys.last else { return CustomKey(stringValue: "")! }
            let keyStringWithoutWhitespaces = key.stringValue.filter { !$0.isWhitespace }
            let lowercasedFirstLetter = keyStringWithoutWhitespaces.prefix(1).lowercased()
            return CustomKey(stringValue: lowercasedFirstLetter + keyStringWithoutWhitespaces.dropFirst())!
        }
        return decoder
    }()

    // [...]
}

```

You will also have noticed that we had to create a concrete implementation conforming to the `CodingKey` protocol as we have to use it to new up an instance to be returned in our `custom` enum case. Modifying our `Parser` struct to use the new decoder and running the test again results in a passing test, which means that we have test-driven our custom key decoding approach into success without the need of using `CodingKeys` enums and doing manual mapping, which can introduce human error when writing the strings and a lot of unnecessary lines of code.
