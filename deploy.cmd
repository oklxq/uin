

npm run docs:build


git add -A
git commit -m 'deploy'

move src/docs/.vuepress/dist docs
git push -f https://github.com/oklxq/uin.git master:gh-pages
