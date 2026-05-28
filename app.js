function login() {
    console.log("Debugging login");
    return true;
}

function logout() {
    return true;
}

Modified File
     ↓
git add -p
     ↓
Choose lines/hunks
     ↓
Staging Area
     ↓
git commit
     ↓
Repository History

O NOT randomly edit context lines.

Only:

remove + additions
sometimes modify - deletions carefully
Real-world Use Cases
Remove debug logs
- console.log()
Separate feature and bugfix

Stage only relevant lines.

Clean commits

Professional workflow:

Commit 1 -> bug fix
Commit 2 -> refactor
Commit 3 -> feature

Even if all changes are in same file.

OPTION 7 — p
Meaning

Split current hunk into smaller hunks.

Use
p

Git tries to divide large block into smaller pieces.

Example

Original hunk:

function login() {
-   return false;
+   console.log("Debugging");
+   return true;
}

+function logout() {
+   return true;
+}

After p:
Git may split into:

Hunk 1
- return false;
+ console.log("Debugging");
+ return true;
Hunk 2
+function logout() {
+ return true;
+}

Now you can:

y -> first
n -> second

Very useful.

OPTION 8 — P
Meaning

Go back to previous hunk.

Useful when navigating multiple hunks.

OPTION 9 — ?
Meaning

Show help menu.

Use
?

Git prints explanations.

Good when learning.

MOST IMPORTANT COMMANDS WITH git add -p
1. View unstaged changes
git diff
2. View staged changes
git diff --staged
3. Start interactive staging
git add -p
4. Commit staged changes
git commit -m "message"