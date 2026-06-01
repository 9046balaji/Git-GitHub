```markdown
# Git Core Commands & Interactive Staging Guide[cite: 4]

## Basic Git Commands[cite: 4]

* **`git init`**  
  Initializes a brand-new, empty Git repository inside your current project folder/directory[cite: 4].

* **`git clone`**  
  Downloads a complete, identical copy of an existing repository from a remote cloud onto your local machine[cite: 4].

* **`git status`**  
  Displays which files are currently modified, which ones are staged, and which files are untracked[cite: 4].

* **`git add`**  
  Takes modified files and places them into the staging area, marking them as ready to be saved[cite: 4].

* **`git commit -m "<message>"`**  
  Permanently saves your staged changes into your local repository timeline alongside an explanatory message[cite: 4]. It creates a snapshot of the entire project at that time, not just the modified files[cite: 4].

---

## Interactive Staging: `git add -p`[cite: 4]

Git does not automatically understand the difference between your **debug code**, **important code**, or **temporary code**[cite: 4]. It only tracks what you explicitly stage and commit[cite: 4]. 

If you do not stage a debug line, it stays only in your local file—it is not committed, and it is not pushed to GitHub[cite: 4]. This helps developers make clean commits by including only the required changes and excluding temporary or unwanted code[cite: 4].

### The Big Idea: Git's Three Stages[cite: 4]
$$\text{Working Directory (Edit files)} \xrightarrow{\text{git add}} \text{Staging Area} \xrightarrow{\text{git commit}} \text{Repository}$$

`git add -p` (or patch mode) sits right in the middle[cite: 4]. It allows for **partial staging**[cite: 4]. This means you can choose to stage[cite: 4]:
* Only one specific function[cite: 4]
* Only a single line[cite: 4]
* Only bug-fix code while leaving out debug logs or unfinished changes[cite: 4]

---

## Detailed Hunk Options[cite: 4]

When running `git add -p`, Git breaks your changes into small sections called **hunks** and asks: *"Do you want to include this part in the next commit?"*[cite: 4] Here is what each option does:

* **`y` (Stage this hunk):** Use this when the entire block is ready to commit[cite: 4]. Only the currently shown hunk is added to the staging area[cite: 4].
* **`n` (Do not stage this hunk):** Use this when you want to keep the changes in your local file but exclude them from the next commit[cite: 4]. The hunk stays strictly in your working directory[cite: 4].
* **`q` (Quit patch mode):** Stops iterating over hunks[cite: 4]. Any decisions you already made will stay as they are, and all remaining hunks are left undecided[cite: 4].
* **`a` (Stage this hunk and all remaining hunks):** Use this when you trust the rest of your changes and want to stage everything from this point onward[cite: 4].
* **`d` (Do not stage this hunk or any remaining hunks):** Use this when you decide none of the remaining changes should be staged[cite: 4]. The current hunk and all remaining hunks are skipped[cite: 4].
* **`s` (Split the current hunk into smaller hunks):** Very useful when a single hunk contains multiple unrelated changes[cite: 4]. Git will break large hunks into smaller ones if possible, allowing you to stage some parts and skip others[cite: 4].
* **`e` (Edit the patch manually):** Git opens the patch in a text editor so you can manually remove lines you do not want staged[cite: 4]. This edits *what will be staged*; it does not directly modify your actual file[cite: 4].
* **`p` (Go to the previous hunk):** Moves backward to the hunk you just looked at[cite: 4].
* **`j` (Jump to the next undecided hunk):** Skips the current hunk for now and moves forward to the next one that still needs a decision[cite: 4].
* **`J` (Go to the next hunk):** Moves forward to the very next hunk, whether it has already been decided or not[cite: 4].
* **`k` (Go to the previous undecided hunk):** Leaves the current hunk and goes back to the closest undecided hunk behind it[cite: 4].
* **`K` (Go to the previous hunk):** Leaves the current hunk and goes back to the absolute previous hunk (decided or undecided)[cite: 4].
* **`?` (Show current hunk again):** Just displays the exact same hunk you are looking at again (useful if you forget what you were reviewing)[cite: 4].
* **`P` (Show current hunk again in full-screen pager):** If the current hunk is too large to read comfortably, this opens it inside a terminal pager (`less`)[cite: 4]. You can scroll up/down to read carefully, then press `q` to quit the pager[cite: 4].
* **`g` (Jump directly to a specific hunk number):** If your file has many hunks (e.g., 20 hunks), instead of scrolling through them one by one, you can type the specific index number to jump directly there[cite: 4].
* **`/` (Search within hunks):** Find a hunk containing specific text (like a variable name or print log)[cite: 4]. Git jumps directly to the first hunk containing that text[cite: 4].

---

## Cheat Sheet: Situation & Option Matrix[cite: 4]

| # | Your Situation / Goal | Git Option Command |
| :--- | :--- | :---: |
| **i** | Stage everything in this block[cite: 4] | `y` |
| **ii** | Skip bad code / Do not stage[cite: 4] | `n` |
| **iii** | Remove debug lines or temporary code[cite: 4] | `e` |
| **iv** | Create separate commits / Handle mixed changes[cite: 4] | `s` |
| **v** | Stop midway / Exit interactive mode[cite: 4] | `q` |
| **vi** | Accept all remaining changes from here on[cite: 4] | `a` |
| **vii** | Skip this hunk and skip all remaining changes[cite: 4] | `d` |
| **viii** | Split the current hunk into smaller hunks[cite: 4] | `s` |
| **9** | Show the current hunk again / View in full-screen pager[cite: 4] | `p` / `P` |
| **10** | Jump to the next undecided hunk[cite: 4] | `j` |
| **11** | Go to the next hunk (decided or undecided)[cite: 4] | `J` |
| **12** | Go to the previous undecided hunk[cite: 4] | `k` |
| **13** | Go to the previous hunk (decided or undecided)[cite: 4] | `K` |
| **14** | Go directly to a specific hunk number[cite: 4] | `g` |
| **15** | Search for specific text within the hunks[cite: 4] | `/` |

```
