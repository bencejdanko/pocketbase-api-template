cd src
git init
git add .
git commit --message "deploy"
git remote add dokku ssh://dokku@32kb.dev:4087/pb
git push dokku master:main -f