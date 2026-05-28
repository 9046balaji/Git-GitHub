import { useState, useEffect, useRef } from "react";

// ============================================================
// DATA
// ============================================================
const sections = [
  {
    id: "basics",
    icon: "🚀",
    title: "CI/CD Basics",
    color: "emerald",
    articles: [
      {
        id: "what-is-cicd",
        title: "What is CI/CD?",
        subtitle: "The foundation of modern software delivery",
        content: [
          {
            type: "intro",
            text: "Imagine you and 5 friends are writing a book together. Every day, everyone makes changes to their own copy. At the end of the month, you try to put it all together — and chaos erupts. That's software development WITHOUT CI/CD."
          },
          {
            type: "concept",
            term: "CI — Continuous Integration",
            simple: "Everyone saves their work to ONE shared place, FREQUENTLY. A robot automatically checks if everything still works together.",
            detail: "Every time a developer writes new code and saves it (called a 'commit'), an automated system immediately builds the project and runs tests. If something breaks, everyone knows within minutes — not weeks."
          },
          {
            type: "concept",
            term: "CD — Continuous Delivery/Deployment",
            simple: "After tests pass, the code is automatically packaged and sent to users — no manual steps needed.",
            detail: "Continuous Delivery means the code is always READY to be released. Continuous Deployment means it's released AUTOMATICALLY. Think of a factory assembly line that automatically packages and ships products the moment they're ready."
          },
          {
            type: "analogy",
            title: "The Restaurant Analogy",
            text: "CI/CD is like a restaurant kitchen. Without it: a chef cooks a whole meal alone, then a taster tries it all at once — by then it's too late to fix. With CI/CD: every ingredient is tasted as it's added. If the sauce is wrong, you know instantly before the whole dish is ruined."
          },
          {
            type: "steps",
            title: "The CI/CD Flow — Step by Step",
            steps: [
              { icon: "✏️", title: "Write Code", desc: "Developer adds a new feature or fixes a bug on their computer" },
              { icon: "📤", title: "Push to GitHub", desc: "Code is uploaded to a shared repository so everyone can see it" },
              { icon: "🤖", title: "Pipeline Triggers", desc: "GitHub Actions automatically starts the CI/CD pipeline" },
              { icon: "🏗️", title: "Build", desc: "The code is compiled/bundled into a runnable application" },
              { icon: "🧪", title: "Test", desc: "Automated tests run to check nothing is broken" },
              { icon: "🔍", title: "Security Scan", desc: "Checks for vulnerabilities or exposed secrets" },
              { icon: "📦", title: "Package", desc: "App is packaged into a Docker container or bundle" },
              { icon: "🚀", title: "Deploy", desc: "The package is sent to staging or production servers" },
            ]
          },
          {
            type: "benefits",
            title: "Why Teams Love CI/CD",
            items: [
              { icon: "⚡", text: "Find bugs in minutes, not months" },
              { icon: "😌", text: "Release without fear — tests catch mistakes" },
              { icon: "🔄", text: "Deploy 10x a day instead of once a month" },
              { icon: "👥", text: "Teams work independently without stepping on each other" },
              { icon: "📈", text: "Customers get new features faster" },
            ]
          }
        ]
      },
      {
        id: "github-actions",
        title: "GitHub Actions Explained",
        subtitle: "How the automation engine works",
        content: [
          {
            type: "intro",
            text: "GitHub Actions is GitHub's built-in robot. You write instructions in a YAML file, and GitHub follows them automatically every time certain things happen (like someone pushes code)."
          },
          {
            type: "concept",
            term: "Workflow",
            simple: "A YAML file that defines WHAT to do and WHEN to do it. Lives in .github/workflows/ folder.",
            detail: "Think of a workflow like a recipe. The recipe says: 'When someone opens the oven (triggers), follow these cooking steps (jobs and steps) using this equipment (runners).'"
          },
          {
            type: "concept",
            term: "Runner",
            simple: "A computer (virtual machine) that GitHub provides to run your pipeline. Like a worker in a factory.",
            detail: "When your pipeline runs, GitHub spins up a fresh computer (ubuntu-latest, windows-latest, or macos-latest), runs all your steps on it, then destroys it. You get a clean machine every single time."
          },
          {
            type: "concept",
            term: "Job",
            simple: "A group of steps that run together on ONE runner. Jobs can run in parallel or in sequence.",
            detail: "A workflow can have multiple jobs. For example: a 'test' job and a 'deploy' job. By default they run at the same time. You can make 'deploy' wait for 'test' to finish using 'needs:'."
          },
          {
            type: "concept",
            term: "Step",
            simple: "A single command or action inside a job. Steps run one after another.",
            detail: "Steps are like individual lines in a recipe. 'Run npm install', 'Run npm test', 'Upload the results'. Each step either runs a shell command (run:) or uses a pre-built action (uses:)."
          },
          {
            type: "diagram",
            title: "How It All Fits Together",
            items: [
              { level: 0, label: "📄 Workflow File (.yml)", desc: "The entire recipe" },
              { level: 1, label: "⚡ Trigger (on: push)", desc: "When to start" },
              { level: 1, label: "🔨 Job: test", desc: "A group of steps" },
              { level: 2, label: "📥 Step: Checkout code", desc: "Get the code" },
              { level: 2, label: "🧪 Step: Run tests", desc: "Execute tests" },
              { level: 1, label: "🚀 Job: deploy", desc: "Another group (needs test)" },
              { level: 2, label: "📦 Step: Build Docker image", desc: "Package app" },
              { level: 2, label: "☁️ Step: Push to registry", desc: "Send to cloud" },
            ]
          }
        ]
      },
      {
        id: "workflow-anatomy",
        title: "Workflow File Anatomy",
        subtitle: "Every line of a YAML workflow explained",
        content: [
          {
            type: "intro",
            text: "Every GitHub Actions workflow is a YAML file. Let's dissect one line by line, in plain English."
          },
          {
            type: "annotated-yaml",
            code: `name: My First Pipeline          # ← The name shown in GitHub UI

on:                              # ← WHEN to run this workflow
  push:                          # ← On every push (code upload)
    branches: [main, develop]    # ← But ONLY to these branches
  pull_request:                  # ← Also run when a PR is opened

jobs:                            # ← List of jobs to run
  test:                          # ← This job is named "test"
    runs-on: ubuntu-latest       # ← Use an Ubuntu Linux computer

    steps:                       # ← List of steps in this job
      - name: Get the code       # ← Human-readable step name
        uses: actions/checkout@v4 # ← Run a pre-built action

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:                    # ← Options to pass to the action
          node-version: '20'     # ← Install Node.js version 20

      - name: Install packages
        run: npm install         # ← Run a shell command

      - name: Run tests
        run: npm test            # ← Another shell command`
          },
          {
            type: "tip",
            text: "💡 YAML is very sensitive to spaces/indentation! Each level of nesting uses 2 spaces. Never use tabs. A single wrong space can break your workflow."
          }
        ]
      }
    ]
  },
  {
    id: "keywords",
    icon: "📖",
    title: "Keyword Reference",
    color: "blue",
    articles: [
      {
        id: "keyword-ref",
        title: "All Keywords Explained",
        subtitle: "Every important YAML keyword in plain English",
        isKeywordRef: true,
        keywords: [
          {
            kw: "name:",
            category: "top-level",
            simple: "The display name of your workflow in the GitHub UI",
            syntax: 'name: My CI Pipeline',
            mistakes: ["Forgetting to quote names with special characters", "Using the same name for multiple workflows (confusing in UI)"],
            example: 'name: Test & Deploy'
          },
          {
            kw: "on:",
            category: "trigger",
            simple: "Defines WHAT EVENTS trigger the workflow to run",
            syntax: 'on:\n  push:\n    branches: [main]\n  pull_request:',
            mistakes: ["Forgetting 'on:' means the workflow NEVER runs", "Triggering on every branch causes too many runs"],
            example: 'on:\n  push:\n    branches: [main, develop]'
          },
          {
            kw: "push:",
            category: "trigger",
            simple: "Trigger when code is pushed (uploaded) to GitHub",
            syntax: 'on:\n  push:\n    branches: [main]\n    paths: [src/**]',
            mistakes: ["Not filtering branches — triggers on every push everywhere", "Forgetting push also triggers on tag creation"],
            example: 'on:\n  push:\n    branches: [main]'
          },
          {
            kw: "pull_request:",
            category: "trigger",
            simple: "Trigger when a Pull Request is opened, updated, or reopened",
            syntax: 'on:\n  pull_request:\n    branches: [main]',
            mistakes: ["Forgetting PRs from forks don't have access to secrets", "Missing 'branches' filter runs on ALL pull requests"],
            example: 'on:\n  pull_request:\n    branches: [main, develop]'
          },
          {
            kw: "workflow_dispatch:",
            category: "trigger",
            simple: "Add a 'Run workflow' button in GitHub so you can trigger it manually",
            syntax: 'on:\n  workflow_dispatch:\n    inputs:\n      environment:\n        type: choice\n        options: [staging, prod]',
            mistakes: ["Forgetting to add inputs — can't configure the run", "Not using this for deployment workflows that need human approval"],
            example: 'on:\n  workflow_dispatch:'
          },
          {
            kw: "schedule:",
            category: "trigger",
            simple: "Run the workflow on a timer, like a cron job (e.g., every night at midnight)",
            syntax: 'on:\n  schedule:\n    - cron: "0 0 * * *"   # midnight UTC',
            mistakes: ["Cron uses UTC time — your midnight is different!", "Scheduled workflows stop running if no repo activity for 60 days"],
            example: 'on:\n  schedule:\n    - cron: "0 6 * * 1"  # Monday 6am'
          },
          {
            kw: "branches:",
            category: "filter",
            simple: "Filter which branch names trigger the workflow",
            syntax: 'on:\n  push:\n    branches:\n      - main\n      - "release/**"',
            mistakes: ["Using 'release/*' works but 'release/**' matches nested paths too", "Listing branches explicitly is brittle — use patterns instead"],
            example: 'branches: [main, "feature/**"]'
          },
          {
            kw: "paths:",
            category: "filter",
            simple: "Only trigger if files in these paths changed — saves runner time",
            syntax: 'on:\n  push:\n    paths:\n      - "src/**"\n      - "package.json"',
            mistakes: ["Without paths filter, touching README triggers full CI unnecessarily", "Pattern 'src/**' doesn't match 'src/index.js' at root without trailing **"],
            example: 'paths: ["src/**", "tests/**", "*.json"]'
          },
          {
            kw: "jobs:",
            category: "structure",
            simple: "The top-level section where you define all the jobs in your workflow",
            syntax: 'jobs:\n  build:\n    runs-on: ubuntu-latest\n  test:\n    runs-on: ubuntu-latest',
            mistakes: ["Not giving jobs descriptive names — 'job1', 'job2' are meaningless", "Putting all steps in one giant job instead of splitting logically"],
            example: 'jobs:\n  test:\n    ...\n  deploy:\n    needs: test'
          },
          {
            kw: "runs-on:",
            category: "job",
            simple: "Which operating system the job runs on (ubuntu, windows, macos, or self-hosted)",
            syntax: 'runs-on: ubuntu-latest\n# or:\nruns-on: windows-latest\nruns-on: macos-latest\nruns-on: self-hosted',
            mistakes: ["ubuntu-latest changes over time — pin version for stability (ubuntu-22.04)", "Using macos runner for simple tasks — it costs 10x more than Linux"],
            example: 'runs-on: ubuntu-22.04'
          },
          {
            kw: "steps:",
            category: "job",
            simple: "A list of individual actions or commands that run sequentially in the job",
            syntax: 'steps:\n  - name: Step 1\n    run: echo hello\n  - name: Step 2\n    run: echo world',
            mistakes: ["Forgetting the leading dash (-) before each step", "Not giving steps a 'name' makes logs hard to read"],
            example: 'steps:\n  - name: Checkout\n    uses: actions/checkout@v4'
          },
          {
            kw: "uses:",
            category: "step",
            simple: "Use a pre-built action from GitHub Marketplace instead of writing shell commands",
            syntax: 'steps:\n  - uses: actions/checkout@v4\n  - uses: actions/setup-node@v4\n    with:\n      node-version: 20',
            mistakes: ["Not pinning the version (@v4) — may break when action updates", "Using @main instead of a version tag — unsafe for production"],
            example: '- uses: actions/checkout@v4'
          },
          {
            kw: "run:",
            category: "step",
            simple: "Run a shell command directly — like typing in a terminal",
            syntax: 'steps:\n  - run: npm install\n  - run: |\n      echo "Multi-line"\n      npm test',
            mistakes: ["Single-line vs multi-line: use | for multiple commands", "Commands fail silently without exit code checks — add 'set -e'"],
            example: '- run: |\n    npm ci\n    npm run build'
          },
          {
            kw: "with:",
            category: "step",
            simple: "Pass parameters/options to an action (like arguments to a function)",
            syntax: '- uses: actions/setup-node@v4\n  with:\n    node-version: "20"\n    cache: "npm"',
            mistakes: ["Forgetting quotes around version numbers (20 vs '20')", "Not checking action docs — 'with' keys are different for every action"],
            example: '- uses: actions/setup-node@v4\n  with:\n    node-version: 20'
          },
          {
            kw: "env:",
            category: "context",
            simple: "Set environment variables available to steps. Can be set at workflow, job, or step level.",
            syntax: 'env:\n  NODE_ENV: production\njobs:\n  build:\n    env:\n      API_URL: https://api.example.com\n    steps:\n      - run: echo $NODE_ENV',
            mistakes: ["Putting secrets in env: — they get exposed in logs!", "Not knowing env: at step level overrides job/workflow level"],
            example: 'env:\n  NODE_ENV: test\n  LOG_LEVEL: debug'
          },
          {
            kw: "secrets:",
            category: "security",
            simple: "Access encrypted secret values stored in GitHub Settings — never put real passwords in code",
            syntax: 'steps:\n  - run: docker login\n    env:\n      DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}',
            mistakes: ["Printing secrets with echo — GitHub masks them but it's bad practice", "Using GITHUB_TOKEN when a personal access token was meant"],
            example: 'env:\n  API_KEY: ${{ secrets.MY_API_KEY }}'
          },
          {
            kw: "needs:",
            category: "job",
            simple: "Make this job wait until another job finishes successfully first",
            syntax: 'jobs:\n  test:\n    runs-on: ubuntu-latest\n  deploy:\n    needs: test\n    runs-on: ubuntu-latest',
            mistakes: ["Forgetting needs: causes deploy to run AT THE SAME TIME as tests", "Chaining too many needs: creates slow sequential pipelines"],
            example: 'deploy:\n  needs: [test, security-scan]'
          },
          {
            kw: "if:",
            category: "conditional",
            simple: "Only run this job or step if a condition is true",
            syntax: 'steps:\n  - name: Deploy\n    if: github.ref == \'refs/heads/main\'\n    run: ./deploy.sh',
            mistakes: ["Forgetting quotes around comparison strings", "Using == instead of equality in expressions"],
            example: "if: github.event_name == 'push' && github.ref == 'refs/heads/main'"
          },
          {
            kw: "strategy:",
            category: "matrix",
            simple: "Parent key for matrix builds — runs your job multiple times with different variables",
            syntax: 'jobs:\n  test:\n    strategy:\n      matrix:\n        node: [16, 18, 20]',
            mistakes: ["Forgetting strategy: is the parent of matrix:", "Not setting fail-fast: false when you want all combinations to run"],
            example: 'strategy:\n  fail-fast: false\n  matrix:\n    os: [ubuntu, macos]'
          },
          {
            kw: "matrix:",
            category: "matrix",
            simple: "Define variables for running the same job with multiple combinations (e.g., test on Node 16, 18, 20)",
            syntax: 'strategy:\n  matrix:\n    node: [16, 18, 20]\n    os: [ubuntu-latest, windows-latest]\n# Creates 3×2 = 6 jobs!',
            mistakes: ["Large matrices eat minutes fast — be selective", "Forgetting ${{ matrix.node }} to reference the value in steps"],
            example: 'matrix:\n  node-version: [18, 20, 22]'
          },
          {
            kw: "fail-fast:",
            category: "matrix",
            simple: "If true (default), cancels all matrix jobs when one fails. Set to false to let all run.",
            syntax: 'strategy:\n  fail-fast: false\n  matrix:\n    node: [16, 18, 20]',
            mistakes: ["Default is true — surprising when you want to see ALL results", "Always setting false wastes minutes on already-failing builds"],
            example: 'strategy:\n  fail-fast: false'
          },
          {
            kw: "outputs:",
            category: "data",
            simple: "Pass data FROM a job to other jobs that depend on it",
            syntax: 'jobs:\n  build:\n    outputs:\n      version: ${{ steps.get-version.outputs.ver }}\n    steps:\n      - id: get-version\n        run: echo "ver=1.2.3" >> $GITHUB_OUTPUT',
            mistakes: ["Forgetting to echo to $GITHUB_OUTPUT — old set-output is deprecated", "Not declaring outputs: at job level before using them in other jobs"],
            example: 'outputs:\n  image-tag: ${{ steps.tag.outputs.value }}'
          },
          {
            kw: "id:",
            category: "step",
            simple: "Give a step an ID so you can reference its outputs in later steps",
            syntax: 'steps:\n  - id: build\n    run: echo "result=success" >> $GITHUB_OUTPUT\n  - run: echo ${{ steps.build.outputs.result }}',
            mistakes: ["Forgetting id: and then trying to use steps.build.outputs — won't work", "Using spaces in IDs — use-hyphens-instead"],
            example: '- id: build-app\n  run: npm run build'
          },
          {
            kw: "continue-on-error:",
            category: "job",
            simple: "If true, the workflow continues even if this step or job fails",
            syntax: 'steps:\n  - name: Optional lint\n    run: npm run lint\n    continue-on-error: true',
            mistakes: ["Overusing it — masks real failures you should know about", "Using at job level vs step level — different behavior"],
            example: '- run: npm run lint\n  continue-on-error: true'
          },
          {
            kw: "timeout-minutes:",
            category: "job",
            simple: "Kill the job if it runs longer than this many minutes — prevents infinite loops eating your quota",
            syntax: 'jobs:\n  test:\n    timeout-minutes: 30\n    steps:\n      - run: npm test',
            mistakes: ["Default is 6 hours — you'll use all your minutes before noticing a hang", "Setting it too low for genuinely long builds"],
            example: 'timeout-minutes: 15'
          },
          {
            kw: "permissions:",
            category: "security",
            simple: "Control what the GITHUB_TOKEN can do — always use least privilege",
            syntax: 'permissions:\n  contents: read\n  packages: write\n  id-token: write  # for OIDC',
            mistakes: ["Leaving default permissions = write-all is a security risk", "Forgetting id-token: write when using OIDC cloud auth"],
            example: 'permissions:\n  contents: read\n  packages: write'
          },
          {
            kw: "services:",
            category: "services",
            simple: "Spin up Docker containers (like a database) alongside your job — like docker-compose for CI",
            syntax: 'services:\n  postgres:\n    image: postgres:15\n    env:\n      POSTGRES_PASSWORD: testpass\n    ports:\n      - 5432:5432',
            mistakes: ["Forgetting to wait for the service to be ready before using it", "Not mapping ports — the service runs but you can't connect"],
            example: 'services:\n  redis:\n    image: redis:7\n    ports: ["6379:6379"]'
          },
          {
            kw: "container:",
            category: "job",
            simple: "Run the ENTIRE job inside a specific Docker container instead of on the runner directly",
            syntax: 'jobs:\n  test:\n    container:\n      image: node:20-alpine\n    steps:\n      - run: node --version',
            mistakes: ["Mixing container: and services: — network connectivity can be tricky", "Using full OS images when lightweight alpine works fine"],
            example: 'container:\n  image: python:3.11-slim'
          },
          {
            kw: "concurrency:",
            category: "job",
            simple: "Cancel in-progress runs when a new one starts — prevents multiple deployments running at once",
            syntax: 'concurrency:\n  group: production-deploy\n  cancel-in-progress: true',
            mistakes: ["Not using group correctly — same group name cancels any workflow, not just the same branch", "Using cancel-in-progress on deployments can leave infrastructure in weird state"],
            example: 'concurrency:\n  group: deploy-${{ github.ref }}\n  cancel-in-progress: true'
          },
          {
            kw: "${{ }}",
            category: "expressions",
            simple: "Expression syntax — evaluate variables, functions, and conditions inside workflows",
            syntax: '# Access variables:\n${{ github.sha }}\n${{ secrets.MY_SECRET }}\n${{ matrix.node }}\n# Use functions:\n${{ contains(github.ref, \'main\') }}\n${{ toJSON(matrix) }}',
            mistakes: ["Forgetting double braces — ${ } is wrong, must be ${{ }}", "Using expression syntax in 'run:' scripts — use $VAR instead"],
            example: 'name: Deploy to ${{ github.ref_name }}'
          },
          {
            kw: "github.ref",
            category: "context",
            simple: "The full git reference that triggered the workflow (e.g., refs/heads/main or refs/tags/v1.0)",
            syntax: "if: github.ref == 'refs/heads/main'\n# Or:\nif: startsWith(github.ref, 'refs/tags/')",
            mistakes: ["Comparing to 'main' instead of 'refs/heads/main' — never matches", "Forgetting branches are refs/heads/X and tags are refs/tags/X"],
            example: "if: startsWith(github.ref, 'refs/tags/v')"
          },
          {
            kw: "github.sha",
            category: "context",
            simple: "The exact commit hash (40 characters) that triggered the run — great for image tagging",
            syntax: '- run: docker build -t myapp:${{ github.sha }} .',
            mistakes: ["Using branch name as tag — same tag gets overwritten on every push", "Not shortening it — github.sha[:7] gives a cleaner short hash"],
            example: 'docker tag myapp:${{ github.sha }}'
          },
          {
            kw: "github.actor",
            category: "context",
            simple: "The GitHub username of the person who triggered the workflow",
            syntax: '- run: echo "Triggered by ${{ github.actor }}"',
            mistakes: ["Using actor for security decisions — it can be spoofed in some contexts", "Confusing actor (triggerer) with owner (repo owner)"],
            example: 'name: Deploy by ${{ github.actor }}'
          },
          {
            kw: "success()",
            category: "functions",
            simple: "Returns true if all previous steps succeeded — use in 'if:' conditions",
            syntax: '- name: Notify success\n  if: success()\n  run: echo "All good!"',
            mistakes: ["Forgetting this is the DEFAULT — you don't need 'if: success()' usually", "Using success() when you want 'always()' — success() skips on prior failure"],
            example: "if: success() && github.ref == 'refs/heads/main'"
          },
          {
            kw: "failure()",
            category: "functions",
            simple: "Returns true if any previous step failed — use to send alerts or clean up",
            syntax: '- name: Send alert\n  if: failure()\n  run: curl -X POST ${{ secrets.SLACK_WEBHOOK }}',
            mistakes: ["Forgetting to add 'if: failure()' on notification steps — they're skipped after failures by default", "Sending failure alerts for expected failures (like lint checks)"],
            example: "if: failure()"
          },
          {
            kw: "always()",
            category: "functions",
            simple: "Run this step no matter what — even if previous steps failed or were cancelled",
            syntax: '- name: Upload test results\n  if: always()\n  uses: actions/upload-artifact@v4\n  with:\n    path: test-results/',
            mistakes: ["Forgetting always() on cleanup steps — they're skipped after failures", "Using always() when you only want it on failure — use failure() instead"],
            example: "if: always()"
          },
          {
            kw: "actions/checkout@v4",
            category: "actions",
            simple: "Downloads your repository code onto the runner — MUST be the first step in almost every job",
            syntax: '- uses: actions/checkout@v4\n  with:\n    fetch-depth: 0  # full history for git log',
            mistakes: ["Forgetting checkout — your runner has no code without it!", "Default fetch-depth: 1 (shallow clone) — breaks tools that need git history"],
            example: '- uses: actions/checkout@v4'
          },
          {
            kw: "actions/cache@v4",
            category: "actions",
            simple: "Save and restore files between runs — speeds up builds by not re-downloading dependencies",
            syntax: '- uses: actions/cache@v4\n  with:\n    path: ~/.npm\n    key: ${{ runner.os }}-node-${{ hashFiles(\'package-lock.json\') }}',
            mistakes: ["Bad cache key design — too broad (never misses) or too narrow (never hits)", "Caching node_modules directly is unreliable — cache ~/.npm instead"],
            example: '- uses: actions/cache@v4\n  with:\n    path: ~/.npm\n    key: node-${{ hashFiles(\'**\/package-lock.json\') }}'
          },
          {
            kw: "actions/upload-artifact@v4",
            category: "actions",
            simple: "Save files from a job so other jobs (or humans) can download them",
            syntax: '- uses: actions/upload-artifact@v4\n  with:\n    name: test-results\n    path: coverage/\n    retention-days: 7',
            mistakes: ["Not specifying retention-days — default 90 days wastes storage", "Uploading too many files — be specific with the path"],
            example: '- uses: actions/upload-artifact@v4\n  with:\n    name: build-output\n    path: dist/'
          },
          {
            kw: "actions/download-artifact@v4",
            category: "actions",
            simple: "Download files that were uploaded by a previous job using upload-artifact",
            syntax: '- uses: actions/download-artifact@v4\n  with:\n    name: build-output\n    path: ./dist',
            mistakes: ["Downloading before uploading — job order matters, use needs:", "Name must EXACTLY match what was used in upload-artifact"],
            example: '- uses: actions/download-artifact@v4\n  with:\n    name: build-output'
          },
        ]
      }
    ]
  },
  {
    id: "concepts",
    icon: "💡",
    title: "Core Concepts",
    color: "purple",
    articles: [
      {
        id: "testing-pyramid",
        title: "The Testing Pyramid",
        subtitle: "Unit, Integration, and E2E tests explained",
        content: [
          {
            type: "intro",
            text: "Not all tests are created equal. The Testing Pyramid helps you understand WHICH tests to write, HOW MANY, and WHY."
          },
          {
            type: "pyramid",
            levels: [
              {
                label: "E2E Tests",
                color: "#ef4444",
                count: "Few",
                emoji: "🌐",
                desc: "Simulate a real user clicking through the browser. Slow (minutes), fragile, but test the WHOLE system. Example: 'User logs in, adds to cart, checks out.'"
              },
              {
                label: "Integration Tests",
                color: "#f59e0b",
                count: "Some",
                emoji: "🔗",
                desc: "Test how multiple parts work TOGETHER. Faster than E2E but slower than unit. Example: 'The API endpoint correctly saves data to the database.'"
              },
              {
                label: "Unit Tests",
                color: "#10b981",
                count: "Many",
                emoji: "🧱",
                desc: "Test one tiny function in isolation. Blazing fast (milliseconds), very reliable. Example: 'The formatPrice(1999) function returns $19.99'"
              }
            ]
          },
          {
            type: "tip",
            text: "🎯 Rule of thumb: Write LOTS of unit tests, SOME integration tests, and a FEW E2E tests. A 70/20/10 split is common. More unit tests = faster feedback loop."
          }
        ]
      },
      {
        id: "secrets-security",
        title: "Secrets & Security",
        subtitle: "Why never hardcode passwords, and safer alternatives",
        content: [
          {
            type: "intro",
            text: "This is one of the most important concepts in DevOps. A 'secret' is any sensitive value: API keys, database passwords, cloud credentials."
          },
          {
            type: "danger",
            title: "❌ NEVER Do This",
            code: `# BAD: Hardcoded secret in your workflow
steps:
  - run: |
      aws s3 sync dist/ s3://mybucket \\
        --access-key-id AKIAXXXXXXXXXXX \\
        --secret-access-key wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
# This is now PUBLIC on GitHub FOREVER (even if you delete it later!)`
          },
          {
            type: "good",
            title: "✅ Do This Instead",
            code: `# GOOD: Use GitHub Secrets
steps:
  - run: |
      aws s3 sync dist/ s3://mybucket
    env:
      AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
# The real value is stored in GitHub Settings > Secrets
# GitHub masks them in logs: *** appears instead`
          },
          {
            type: "concept",
            term: "OIDC — The Even Better Way",
            simple: "Instead of static secrets, GitHub gets a temporary token valid for minutes. Like a day pass instead of a permanent key.",
            detail: "OIDC (OpenID Connect) lets GitHub Actions request short-lived credentials from AWS/GCP/Azure directly. No secrets to rotate, no static keys to leak. GitHub proves 'I am this repo running this workflow' and gets a token valid for 15 minutes."
          },
          {
            type: "steps",
            title: "Security Rules to Live By",
            steps: [
              { icon: "🔐", title: "Never hardcode secrets", desc: "Not in code, not in workflows, not in comments. Ever." },
              { icon: "🎯", title: "Least privilege", desc: "Give permissions only for what's needed. If it only reads S3, don't give write access." },
              { icon: "⏰", title: "Rotate regularly", desc: "Change static keys every 90 days. OIDC solves this automatically." },
              { icon: "🔍", title: "Audit regularly", desc: "Review who has access to secrets in GitHub Settings." },
              { icon: "🚨", title: "Scan for leaks", desc: "Tools like GitGuardian or GitHub's own secret scanning alert you if secrets slip in." },
            ]
          }
        ]
      },
      {
        id: "docker-ci",
        title: "Docker in CI/CD",
        subtitle: "Why we containerize everything",
        content: [
          {
            type: "intro",
            text: "Docker packages your application and ALL its dependencies into one portable box. 'It works on my machine' becomes 'It works EVERYWHERE.'"
          },
          {
            type: "analogy",
            title: "The Shipping Container Analogy",
            text: "Before shipping containers, loading a ship was chaos — different box sizes, different packing methods. Shipping containers standardized everything. Docker does the same for software: one standard format that runs identically on a developer's laptop, CI runner, and production server."
          },
          {
            type: "annotated-yaml",
            code: `# Dockerfile — the recipe for your container
FROM node:20-alpine        # Start with Node.js pre-installed

WORKDIR /app               # Set working directory

COPY package*.json ./      # Copy dependency list first
RUN npm ci                 # Install dependencies (cached layer!)

COPY . .                   # Copy all source code

RUN npm run build          # Build the app

EXPOSE 3000                # Document which port we use

CMD ["node", "dist/main.js"]  # What to run when container starts`
          },
          {
            type: "concept",
            term: "Image Layers & Caching",
            simple: "Each line in a Dockerfile creates a 'layer'. Unchanged layers are reused from cache — making builds fast.",
            detail: "Docker caches each layer. If package.json doesn't change, 'npm install' uses the cache and runs in 1 second instead of 2 minutes. This is why you COPY package.json BEFORE the rest of your code — it only invalidates the install layer when dependencies change."
          },
          {
            type: "annotated-yaml",
            code: `# In GitHub Actions: build and push a Docker image
steps:
  - uses: actions/checkout@v4
  
  - name: Login to Docker Hub
    uses: docker/login-action@v3
    with:
      username: \${{ secrets.DOCKER_USERNAME }}
      password: \${{ secrets.DOCKER_PASSWORD }}

  - name: Build and push
    uses: docker/build-push-action@v5
    with:
      push: true
      tags: myuser/myapp:\${{ github.sha }}`
          }
        ]
      },
      {
        id: "deployment-strategies",
        title: "Deployment Strategies",
        subtitle: "Blue/Green, Canary, Rolling — how to deploy safely",
        content: [
          {
            type: "intro",
            text: "Deploying new code always carries risk. These strategies help you release safely and roll back quickly if something goes wrong."
          },
          {
            type: "concept",
            term: "🔵🟢 Blue/Green Deployment",
            simple: "Run TWO identical environments. Switch traffic instantly. If problems arise, switch back in seconds.",
            detail: "Blue is the live production environment. Green is the identical environment with the new version. When green is ready and tested, you flip the load balancer to point at green. Blue stays running as instant rollback. Zero downtime, instant rollback."
          },
          {
            type: "concept",
            term: "🐦 Canary Deployment",
            simple: "Send 1% of traffic to the new version. Monitor it. If healthy, gradually increase to 5%, 10%, 100%.",
            detail: "Named after 'canary in a coal mine' — the canary detects danger before everyone else is affected. Perfect for detecting issues that only appear under real user load. If the canary shows errors, stop and roll back. Only 1% of users were affected."
          },
          {
            type: "concept",
            term: "🔄 Rolling Deployment",
            simple: "Update servers one by one. At any moment, old and new versions run simultaneously until all are updated.",
            detail: "If you have 10 servers, rolling update replaces 1 at a time. Server 1 gets new code, traffic shifts, then server 2, etc. Slightly slower than blue/green but requires only existing infrastructure. Risk: old and new versions must be compatible during transition."
          },
          {
            type: "tip",
            text: "🚨 Always have a rollback plan. A good deployment pipeline has a one-click (or automatic) way to revert to the previous version within minutes."
          }
        ]
      },
      {
        id: "branches",
        title: "Trunk-Based vs Feature Branches",
        subtitle: "Two schools of thought on branching strategy",
        content: [
          {
            type: "intro",
            text: "How developers organize their code changes matters enormously for CI/CD. Here are the two main approaches."
          },
          {
            type: "concept",
            term: "🌿 Feature Branches",
            simple: "Each new feature gets its own branch. Develop there, then merge to main via Pull Request.",
            detail: "Developer creates branch 'feature/user-login', works there for days/weeks, then opens a Pull Request. CI runs tests on the PR. Team reviews the code. On approval, it merges to main. This is GitHub Flow — the most popular approach."
          },
          {
            type: "concept",
            term: "🎯 Trunk-Based Development",
            simple: "Everyone commits to main (the 'trunk') multiple times a day. Features hidden behind feature flags.",
            detail: "More advanced approach used by Google, Facebook. Keeps the main branch always deployable. New features exist in code but are disabled by a feature flag. No long-lived branches = no merge conflicts. Requires strong CI and feature flag infrastructure."
          },
          {
            type: "tip",
            text: "💡 Most teams use Feature Branches. Start there. Move toward trunk-based development as your team and CI/CD matures. The key principle: merge small changes OFTEN rather than large changes rarely."
          }
        ]
      }
    ]
  },
  {
    id: "cheatsheets",
    icon: "📋",
    title: "Cheat Sheets",
    color: "amber",
    articles: [
      {
        id: "syntax-quickref",
        title: "GitHub Actions Syntax Quick Reference",
        subtitle: "The most important patterns at a glance",
        isCheatSheet: true,
        sections: [
          {
            title: "Trigger Patterns",
            items: [
              { label: "Push to main", code: "on:\n  push:\n    branches: [main]" },
              { label: "Pull Request", code: "on:\n  pull_request:\n    branches: [main]" },
              { label: "Manual trigger", code: "on:\n  workflow_dispatch:" },
              { label: "Scheduled (cron)", code: "on:\n  schedule:\n    - cron: '0 0 * * *'" },
              { label: "On new tag", code: "on:\n  push:\n    tags: ['v*']" },
            ]
          },
          {
            title: "Common Conditions",
            items: [
              { label: "Only on main branch", code: "if: github.ref == 'refs/heads/main'" },
              { label: "Only on tag push", code: "if: startsWith(github.ref, 'refs/tags/')" },
              { label: "After failure", code: "if: failure()" },
              { label: "Always run", code: "if: always()" },
              { label: "Manual trigger only", code: "if: github.event_name == 'workflow_dispatch'" },
            ]
          },
          {
            title: "Context Variables",
            items: [
              { label: "Commit SHA", code: "${{ github.sha }}" },
              { label: "Branch/tag ref", code: "${{ github.ref }}" },
              { label: "Actor username", code: "${{ github.actor }}" },
              { label: "Event name", code: "${{ github.event_name }}" },
              { label: "Short ref name", code: "${{ github.ref_name }}" },
              { label: "Repo name", code: "${{ github.repository }}" },
            ]
          }
        ]
      },
      {
        id: "env-vars",
        title: "Built-In Environment Variables",
        subtitle: "Variables GitHub sets automatically on every runner",
        isCheatSheet: true,
        sections: [
          {
            title: "GitHub Variables (auto-set)",
            items: [
              { label: "GITHUB_SHA", code: "The full 40-char commit hash" },
              { label: "GITHUB_REF", code: "The branch/tag ref (refs/heads/main)" },
              { label: "GITHUB_ACTOR", code: "Username who triggered the run" },
              { label: "GITHUB_REPOSITORY", code: "owner/repo-name" },
              { label: "GITHUB_WORKSPACE", code: "Path to checked-out code" },
              { label: "GITHUB_OUTPUT", code: "File path to write step outputs to" },
              { label: "GITHUB_ENV", code: "File path to set env vars for next steps" },
              { label: "RUNNER_OS", code: "Linux, Windows, or macOS" },
            ]
          }
        ]
      },
      {
        id: "exit-codes",
        title: "Exit Codes & Failure Modes",
        subtitle: "Understanding why jobs fail",
        isCheatSheet: true,
        sections: [
          {
            title: "Exit Codes",
            items: [
              { label: "0", code: "Success — step passed ✅" },
              { label: "1", code: "General error — step failed ❌" },
              { label: "2", code: "Misuse of shell command" },
              { label: "126", code: "Command not executable" },
              { label: "127", code: "Command not found (typo?)" },
              { label: "128+n", code: "Killed by signal n" },
            ]
          },
          {
            title: "Job Status Values",
            items: [
              { label: "success", code: "All steps passed" },
              { label: "failure", code: "One or more steps failed" },
              { label: "cancelled", code: "Workflow was manually cancelled" },
              { label: "skipped", code: "Step was skipped due to if: condition" },
            ]
          }
        ]
      }
    ]
  }
];

// ============================================================
// COMPONENTS
// ============================================================

function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ margin: "10px 0", borderRadius: 8, overflow: "hidden", border: "1px solid #2a2a2a" }}>
      {label && (
        <div style={{ background: "#0f0f0f", padding: "4px 12px", fontSize: 11, color: "#6b7280", borderBottom: "1px solid #2a2a2a", display: "flex", justifyContent: "space-between" }}>
          <span>{label}</span>
          <button onClick={copy} style={{ background: "none", border: "none", color: copied ? "#10b981" : "#6b7280", cursor: "pointer", fontSize: 11 }}>{copied ? "✓ copied" : "copy"}</button>
        </div>
      )}
      {!label && (
        <div style={{ background: "#0f0f0f", padding: "4px 12px", display: "flex", justifyContent: "flex-end", borderBottom: "1px solid #1a1a1a" }}>
          <button onClick={copy} style={{ background: "none", border: "none", color: copied ? "#10b981" : "#6b7280", cursor: "pointer", fontSize: 11 }}>{copied ? "✓ copied" : "copy"}</button>
        </div>
      )}
      <pre style={{ margin: 0, padding: "12px 14px", background: "#080808", color: "#d1fae5", fontSize: 12.5, fontFamily: "monospace", overflowX: "auto", lineHeight: 1.7, whiteSpace: "pre" }}>
        {code.split("\n").map((line, i) => {
          const isComment = line.trim().startsWith("#");
          return (
            <span key={i} style={{ display: "block", color: isComment ? "#4b5563" : line.includes(":") && !line.includes("${{") && !isComment ? "#a7f3d0" : "#d1fae5" }}>
              {line}
            </span>
          );
        })}
      </pre>
    </div>
  );
}

function ArticleContent({ content }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {content.map((block, i) => {
        if (block.type === "intro") return (
          <div key={i} style={{ padding: "16px 20px", background: "#0d1f14", borderLeft: "3px solid #10b981", borderRadius: "0 8px 8px 0", color: "#a7f3d0", fontSize: 15, lineHeight: 1.7 }}>
            {block.text}
          </div>
        );
        if (block.type === "analogy") return (
          <div key={i} style={{ padding: "16px 20px", background: "#1a1200", borderLeft: "3px solid #f59e0b", borderRadius: "0 8px 8px 0" }}>
            <div style={{ color: "#fbbf24", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>{block.title}</div>
            <div style={{ color: "#fde68a", fontSize: 14, lineHeight: 1.7 }}>{block.text}</div>
          </div>
        );
        if (block.type === "tip") return (
          <div key={i} style={{ padding: "14px 18px", background: "#0f172a", borderLeft: "3px solid #6366f1", borderRadius: "0 8px 8px 0", color: "#c7d2fe", fontSize: 14, lineHeight: 1.7 }}>
            {block.text}
          </div>
        );
        if (block.type === "danger") return (
          <div key={i}>
            <div style={{ color: "#f87171", fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{block.title}</div>
            <CodeBlock code={block.code} />
          </div>
        );
        if (block.type === "good") return (
          <div key={i}>
            <div style={{ color: "#34d399", fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{block.title}</div>
            <CodeBlock code={block.code} />
          </div>
        );
        if (block.type === "annotated-yaml") return (
          <CodeBlock key={i} code={block.code} label="YAML" />
        );
        if (block.type === "concept") return (
          <div key={i} style={{ background: "#141414", border: "1px solid #2a2a2a", borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ fontFamily: "monospace", color: "#34d399", fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{block.term}</div>
            <div style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.7, marginBottom: 10, padding: "10px 14px", background: "#0d0d0d", borderRadius: 6 }}>
              💬 <strong>Simple version:</strong> {block.simple}
            </div>
            <div style={{ color: "#94a3b8", fontSize: 13.5, lineHeight: 1.7 }}>{block.detail}</div>
          </div>
        );
        if (block.type === "steps") return (
          <div key={i}>
            <div style={{ color: "#e2e8f0", fontWeight: 600, marginBottom: 12, fontSize: 15 }}>{block.title}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
              {block.steps.map((step, j) => (
                <div key={j} style={{ background: "#141414", border: "1px solid #2a2a2a", borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{step.icon}</div>
                  <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{step.title}</div>
                  <div style={{ color: "#6b7280", fontSize: 12, lineHeight: 1.5 }}>{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        );
        if (block.type === "benefits") return (
          <div key={i}>
            <div style={{ color: "#e2e8f0", fontWeight: 600, marginBottom: 12, fontSize: 15 }}>{block.title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {block.items.map((item, j) => (
                <div key={j} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 14px", background: "#141414", borderRadius: 8 }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <span style={{ color: "#d1d5db", fontSize: 14 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        );
        if (block.type === "diagram") return (
          <div key={i}>
            <div style={{ color: "#e2e8f0", fontWeight: 600, marginBottom: 12, fontSize: 15 }}>{block.title}</div>
            <div style={{ background: "#0d0d0d", borderRadius: 10, padding: "16px", border: "1px solid #2a2a2a" }}>
              {block.items.map((item, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", paddingLeft: item.level * 24 }}>
                  <span style={{ color: "#374151", fontSize: 12 }}>{item.level > 0 ? "└─" : ""}</span>
                  <span style={{ fontFamily: "monospace", color: item.level === 0 ? "#34d399" : item.level === 1 ? "#60a5fa" : "#a78bfa", fontSize: 13 }}>{item.label}</span>
                  <span style={{ color: "#4b5563", fontSize: 12 }}>— {item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        );
        if (block.type === "pyramid") return (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {block.levels.map((level, j) => (
              <div key={j} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 18px", background: "#141414", border: `1px solid ${level.color}40`, borderLeft: `4px solid ${level.color}`, borderRadius: "0 8px 8px 0" }}>
                <span style={{ fontSize: 24 }}>{level.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                    <span style={{ color: level.color, fontWeight: 700, fontSize: 15 }}>{level.label}</span>
                    <span style={{ background: `${level.color}20`, color: level.color, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{level.count}</span>
                  </div>
                  <div style={{ color: "#9ca3af", fontSize: 13.5, lineHeight: 1.6 }}>{level.desc}</div>
                </div>
              </div>
            ))}
          </div>
        );
        return null;
      })}
    </div>
  );
}

function KeywordCard({ kw }) {
  const [expanded, setExpanded] = useState(false);
  const categoryColors = {
    "top-level": "#10b981", "trigger": "#f59e0b", "filter": "#6366f1",
    "structure": "#60a5fa", "job": "#34d399", "step": "#a78bfa",
    "context": "#fb923c", "security": "#ef4444", "matrix": "#8b5cf6",
    "data": "#14b8a6", "conditional": "#f472b6", "services": "#fbbf24",
    "expressions": "#22d3ee", "functions": "#d946ef", "actions": "#10b981"
  };
  const color = categoryColors[kw.category] || "#6b7280";

  return (
    <div style={{ background: "#141414", border: `1px solid ${expanded ? color + "50" : "#2a2a2a"}`, borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ width: "100%", background: "none", border: "none", padding: "14px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "monospace", color, fontWeight: 700, fontSize: 15 }}>{kw.kw}</span>
          <span style={{ background: `${color}15`, color, padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600, textTransform: "uppercase" }}>{kw.category}</span>
        </div>
        <span style={{ color: "#4b5563", fontSize: 18 }}>{expanded ? "−" : "+"}</span>
      </button>
      {!expanded && (
        <div style={{ padding: "0 16px 12px", color: "#6b7280", fontSize: 13 }}>{kw.simple}</div>
      )}
      {expanded && (
        <div style={{ padding: "0 16px 16px", borderTop: "1px solid #2a2a2a" }}>
          <div style={{ padding: "12px 14px", background: "#0d1f14", borderRadius: 8, color: "#a7f3d0", fontSize: 13.5, lineHeight: 1.6, margin: "12px 0" }}>
            💬 {kw.simple}
          </div>
          <CodeBlock code={kw.syntax} label="Syntax" />
          <div style={{ marginTop: 12 }}>
            <div style={{ color: "#f87171", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>⚠️ Common Mistakes</div>
            {kw.mistakes.map((m, i) => (
              <div key={i} style={{ color: "#9ca3af", fontSize: 12.5, lineHeight: 1.5, marginBottom: 4 }}>• {m}</div>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ color: "#6b7280", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>📌 Real Example</div>
            <CodeBlock code={kw.example} />
          </div>
        </div>
      )}
    </div>
  );
}

function CheatSheet({ article }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {article.sections.map((sec, i) => (
        <div key={i}>
          <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6b7280" }}>{sec.title}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8 }}>
            {sec.items.map((item, j) => (
              <div key={j} style={{ background: "#141414", border: "1px solid #222", borderRadius: 8, padding: "10px 14px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "monospace", color: "#f59e0b", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", minWidth: 100 }}>{item.label}</span>
                <span style={{ fontFamily: "monospace", color: "#60a5fa", fontSize: 12, wordBreak: "break-all" }}>{item.code}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [activeSection, setActiveSection] = useState("basics");
  const [activeArticle, setActiveArticle] = useState("what-is-cicd");
  const [search, setSearch] = useState("");
  const [kwSearch, setKwSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentSection = sections.find(s => s.id === activeSection);
  const currentArticle = currentSection?.articles.find(a => a.id === activeArticle);

  const filteredKeywords = currentArticle?.keywords?.filter(k =>
    !kwSearch || k.kw.toLowerCase().includes(kwSearch.toLowerCase()) || k.simple.toLowerCase().includes(kwSearch.toLowerCase()) || k.category.toLowerCase().includes(kwSearch.toLowerCase())
  );

  const allArticles = sections.flatMap(s => s.articles.map(a => ({ ...a, sectionId: s.id, sectionTitle: s.title })));
  const searchResults = search.length > 1 ? allArticles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.subtitle?.toLowerCase().includes(search.toLowerCase()) ||
    a.keywords?.some(k => k.kw.toLowerCase().includes(search.toLowerCase()) || k.simple.toLowerCase().includes(search.toLowerCase()))
  ) : [];

  const navTo = (sectionId, articleId) => {
    setActiveSection(sectionId);
    setActiveArticle(articleId);
    setSearch("");
  };

  const colorMap = { emerald: "#10b981", blue: "#60a5fa", purple: "#a78bfa", amber: "#f59e0b" };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e2e8f0", fontFamily: "system-ui, -apple-system, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "0 20px", height: 52, display: "flex", alignItems: "center", gap: 16, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: 18, padding: "4px 6px" }}>☰</button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>⚡</span>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#e2e8f0" }}>CI/CD Learning Hub</span>
          <span style={{ background: "#10b98120", color: "#10b981", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600 }}>GitHub Actions</span>
        </div>
        <div style={{ flex: 1, maxWidth: 400, position: "relative" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search anything… keywords, concepts, syntax"
            style={{ width: "100%", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, padding: "6px 12px 6px 32px", color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" }}
          />
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#4b5563", fontSize: 14 }}>🔍</span>
          {search.length > 1 && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, zIndex: 200, overflow: "hidden", maxHeight: 300, overflowY: "auto" }}>
              {searchResults.length === 0 ? (
                <div style={{ padding: "12px 14px", color: "#6b7280", fontSize: 13 }}>No results for "{search}"</div>
              ) : searchResults.map((a, i) => (
                <button key={i} onClick={() => navTo(a.sectionId, a.id)} style={{ width: "100%", background: "none", border: "none", padding: "10px 14px", cursor: "pointer", textAlign: "left", borderBottom: "1px solid #1e1e1e" }}>
                  <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 500 }}>{a.title}</div>
                  <div style={{ color: "#6b7280", fontSize: 11 }}>{a.sectionTitle}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        {sidebarOpen && (
          <div style={{ width: 240, background: "#0d0d0d", borderRight: "1px solid #1e1e1e", padding: "16px 0", flexShrink: 0, overflowY: "auto", position: "sticky", top: 52, height: "calc(100vh - 52px)" }}>
            {sections.map(sec => {
              const color = colorMap[sec.color];
              return (
                <div key={sec.id} style={{ marginBottom: 8 }}>
                  <div style={{ padding: "6px 16px", color: "#4b5563", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {sec.icon} {sec.title}
                  </div>
                  {sec.articles.map(art => (
                    <button
                      key={art.id}
                      onClick={() => navTo(sec.id, art.id)}
                      style={{
                        width: "100%", background: activeArticle === art.id ? `${color}15` : "none",
                        border: "none", borderLeft: activeArticle === art.id ? `3px solid ${color}` : "3px solid transparent",
                        padding: "8px 16px 8px 14px", cursor: "pointer", textAlign: "left"
                      }}
                    >
                      <div style={{ color: activeArticle === art.id ? color : "#9ca3af", fontSize: 13, fontWeight: activeArticle === art.id ? 600 : 400, lineHeight: 1.3 }}>{art.title}</div>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Main content */}
        <div style={{ flex: 1, padding: "32px 40px", maxWidth: 900, overflowY: "auto" }}>
          {currentArticle && (
            <>
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ color: colorMap[currentSection?.color], fontSize: 13, fontWeight: 600 }}>{currentSection?.icon} {currentSection?.title}</span>
                  <span style={{ color: "#2a2a2a" }}>›</span>
                </div>
                <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 700, color: "#f9fafb" }}>{currentArticle.title}</h1>
                <p style={{ margin: 0, color: "#6b7280", fontSize: 15 }}>{currentArticle.subtitle}</p>
              </div>

              {currentArticle.content && <ArticleContent content={currentArticle.content} />}

              {currentArticle.isKeywordRef && (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <input
                      value={kwSearch}
                      onChange={e => setKwSearch(e.target.value)}
                      placeholder="Filter keywords… e.g. 'trigger', 'matrix', 'checkout'"
                      style={{ width: "100%", background: "#141414", border: "1px solid #2a2a2a", borderRadius: 8, padding: "8px 14px", color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div style={{ fontSize: 12, color: "#4b5563", marginBottom: 14 }}>
                    Showing {filteredKeywords?.length || 0} of {currentArticle.keywords?.length} keywords
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {filteredKeywords?.map((kw, i) => <KeywordCard key={i} kw={kw} />)}
                  </div>
                </>
              )}

              {currentArticle.isCheatSheet && <CheatSheet article={currentArticle} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}