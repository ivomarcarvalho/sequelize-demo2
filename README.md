npm init -y
npm i nodemon -D
npm i express
npm i sequelize mysql2
npm i dotenv

// migrations para o sequelize
npx sequelize-cli init
npx sequelize-cli migration:generate --name create-usuario
alterar migrations
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo:all

npx sequelize-cli seed:generate --name create-usuario
alterar seeders
npx sequelize-cli db:seed:all
deletar
npx sequelize-cli db:seed:undo:all

winget install --id Git.Git -e --source winget

git init
git -v
git status
git add .
git commit -m "msg"



# renomear de master para main
git branch -M "main"

git push -u origin main
git remote add origin https://github.com/ivomarcarvalho/sequelize-demo2
git clone https://github.com/ivomarcarvalho/sequelize-demo2.git
git push 