function Footer() {
  return (
    <footer className="border-t border-zinc-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Shrey Madaan. All rights reserved.
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            href="https://github.com/ShreyMadaan"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
          >
            GitHub ↗
          </a>

          <a
            href="https://www.linkedin.com/in/shrey-madaan-bb3167137"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
          >
            LinkedIn ↗
          </a>

          <a
            href="https://www.scaler.com/academy/profile/95e2a79c7e34/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
          >
            Scaler ↗
          </a>

          <a
            href="https://www.geeksforgeeks.org/profile/shreymadaan31"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
          >
            GeeksforGeeks ↗
          </a>

          <a
            href="https://leetcode.com/u/ShreyMadaan31/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
          >
            LeetCode ↗
          </a>

          <a
            href="#home"
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;