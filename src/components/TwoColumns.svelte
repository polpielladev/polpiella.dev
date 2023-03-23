<div class="my-0 flex gap-12">
  <div class="flex flex-shrink flex-grow basis-[0%] flex-col gap-8">
    <slot name="main" />
  </div>
  <aside
    class="prose hidden flex-shrink-0 flex-grow-0 basis-[320px] flex-col gap-8 dark:prose-invert md:flex">
    <slot name="aside" />
  </aside>
</div>
