# Git Core Commands & Interactive Staging Guide

## Basic Git Commands

- **`git init`**  
  Initializes a brand-new, empty Git repository inside your current project folder/directory.

- **`git clone`**  
  Downloads a complete, identical copy of an existing repository from a remote cloud onto your local machine.

- **`git status`**  
  Displays which files are currently modified, which ones are staged, and which files are untracked.

- **`git add`**  
  Takes modified files and places them into the staging area, marking them as ready to be saved.

- **`git commit -m "<message>"`**  
  Permanently saves your staged changes into your local repository timeline alongside an explanatory message. It creates a snapshot of the entire project at that time, not just the modified files.

---

## Interactive Staging: `git add -p`

Git does not automatically understand the difference between your **debug code**, **important code**, or **temporary code**. It only tracks what you explicitly stage and commit.

If you do not stage a debug line, it stays only in your local file—it is not committed, and it is not pushed to GitHub. This helps developers make clean commits by including only the required changes and excluding temporary or unwanted code.

### The Big Idea: Git's Three Stages

```
Working Directory (Edit files) → [git add] → Staging Area → [git commit] → Repository
```

`git add -p` (or patch mode) sits right in the middle. It allows for **partial staging**. This means you can choose to stage:

- Only one specific function
- Only a single line
- Only bug-fix code while leaving out debug logs or unfinished changes

---

## Detailed Hunk Options

When running `git add -p`, Git breaks your changes into small sections called **hunks** and asks: *"Do you want to include this part in the next commit?"* Here is what each option does:

- **`y` (Stage this hunk):** Use this when the entire block is ready to commit. Only the currently shown hunk is added to the staging area.

- **`n` (Do not stage this hunk):** Use this when you want to keep the changes in your local file but exclude them from the next commit. The hunk stays strictly in your working directory.

- **`q` (Quit patch mode):** Stops iterating over hunks. Any decisions you already made will stay as they are, and all remaining hunks are left undecided.

- **`a` (Stage this hunk and all remaining hunks):** Use this when you trust the rest of your changes and want to stage everything from this point onward.

- **`d` (Do not stage this hunk or any remaining hunks):** Use this when you decide none of the remaining changes should be staged. The current hunk and all remaining hunks are skipped.

- **`s` (Split the current hunk into smaller hunks):** Very useful when a single hunk contains multiple unrelated changes. Git will break large hunks into smaller ones if possible, allowing you to stage some parts and skip others.

- **`e` (Edit the patch manually):** Git opens the patch in a text editor so you can manually remove lines you do not want staged. This edits *what will be staged*; it does not directly modify your actual file.

- **`p` (Go to the previous hunk):** Moves backward to the hunk you just looked at.

- **`j` (Jump to the next undecided hunk):** Skips the current hunk for now and moves forward to the next one that still needs a decision.

- **`J` (Go to the next hunk):** Moves forward to the very next hunk, whether it has already been decided or not.

- **`k` (Go to the previous undecided hunk):** Leaves the current hunk and goes back to the closest undecided hunk behind it.

- **`K` (Go to the previous hunk):** Leaves the current hunk and goes back to the absolute previous hunk (decided or undecided).

- **`?` (Show current hunk again):** Just displays the exact same hunk you are looking at again (useful if you forget what you were reviewing).

- **`P` (Show current hunk again in full-screen pager):** If the current hunk is too large to read comfortably, this opens it inside a terminal pager (`less`). You can scroll up/down to read carefully, then press `q` to quit the pager.

- **`g` (Jump directly to a specific hunk number):** If your file has many hunks (e.g., 20 hunks), instead of scrolling through them one by one, you can type the specific index number to jump directly there.

- **`/` (Search within hunks):** Find a hunk containing specific text (like a variable name or print log). Git jumps directly to the first hunk containing that text.

---

## Cheat Sheet: Situation & Option Matrix

| # | Your Situation / Goal | Git Option Command |
| --- | ----- | :---: |
| **1** | Stage everything in this block | `y` |
| **2** | Skip bad code / Do not stage | `n` |
| **3** | Remove debug lines or temporary code | `e` |
| **4** | Create separate commits / Handle mixed changes | `s` |
| **5** | Stop midway / Exit interactive mode | `q` |
| **6** | Accept all remaining changes from here on | `a` |
| **7** | Skip this hunk and skip all remaining changes | `d` |
| **8** | Split the current hunk into smaller hunks | `s` |
| **9** | Show the current hunk again / View in full-screen pager | `p` / `P` |
| **10** | Jump to the next undecided hunk | `j` |
| **11** | Go to the next hunk (decided or undecided) | `J` |
| **12** | Go to the previous undecided hunk | `k` |
| **13** | Go to the previous hunk (decided or undecided) | `K` |
| **14** | Go directly to a specific hunk number | `g` |
| **15** | Search for specific text within the hunks | `/` |
