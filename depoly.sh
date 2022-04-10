#!/bin/bash

echo "deploy..."
# 确保脚本抛出遇到的错误
set -env

# 生成静态文件
yarn build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:zhou-fuyi/zhou-fuyi.github.io.git master:gh-pages

cd -
