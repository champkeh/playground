# playground

> 该项目用于存放 toolbox 仓库的源码，打包结果会发布在 toolbox 仓库下，同时 toolbox 仓库开启了 gh-pages功能


## 该项目的搭建过程

### 1. 添加对 toolbox 仓库的远程引用 
```shell script
git remote add toolbox git@github.com:champkeh/toolbox.git
```

### 2. 把 dist 目录作为 subtree 设置为 toolbox 仓库
```
git subtree add --prefix dist toolbox master
```

### 3. 修改项目下面的 .gitignore 文件，确保 dist 目录被 git 托管

### 4. 打包，生成最新的 dist 目录
```shell script
npm run build
```

### 5. 推送到 subtree
```shell script
# 推送之前需要先pull
git subtree pull --prefix dist toolbox master

git subtree push --prefix dist toolbox master
```
