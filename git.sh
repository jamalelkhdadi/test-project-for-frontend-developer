git add .
echo -n 'Commit: '
read commit
git commit -m "$commit"
git push -u origin main
git status