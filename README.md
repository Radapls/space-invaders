### Step 1: Create a GitHub Action Workflow

1. In your repository, create a directory called `.github/workflows` if it doesn't already exist.
2. Inside the `workflows` directory, create a new file named `deploy.yml`.

### Step 2: Define the Workflow

Here’s a sample workflow configuration for deploying to GitHub Pages:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # Change this to your default branch if it's not 'main'

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'  # Change this to your required Node.js version

      - name: Install dependencies
        run: npm install  # Change this if you're using a different package manager

      - name: Build the project
        run: npm run build  # Change this to your build command

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist  # Change this to your build output directory
```

### Step 3: Customize the Workflow

- **Branch**: Change `main` to the branch you want to trigger the deployment from.
- **Node.js Version**: Adjust the `node-version` to match your project's requirements.
- **Install Command**: Modify `npm install` if you are using a different package manager (like Yarn).
- **Build Command**: Change `npm run build` to whatever command you use to build your project.
- **Publish Directory**: Update `publish_dir` to point to the directory where your built files are located (e.g., `./dist`, `./public`, etc.).

### Step 4: Commit and Push

After creating and customizing the `deploy.yml` file, commit your changes and push them to your repository:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push origin main  # Change 'main' if necessary
```

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click on "Settings".
3. Scroll down to the "Pages" section.
4. Under "Source", select the branch you want to use for GitHub Pages (usually `gh-pages` if using the action above) and click "Save".

### Step 6: Check the Action

After pushing your changes, navigate to the "Actions" tab in your GitHub repository to see the workflow run. If everything is set up correctly, it should build your project and deploy it to GitHub Pages.

### Additional Notes

- Make sure your repository is public if you want to use GitHub Pages for free.
- If you need to deploy to a custom domain, you may need to set up a `CNAME` file in your publish directory.
- You can also customize the workflow further based on your specific needs (e.g., adding tests, linting, etc.).

That's it! You now have a GitHub Action that automatically deploys your project to GitHub Pages whenever you push to the specified branch.