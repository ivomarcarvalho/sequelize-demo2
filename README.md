npm init -y
npm i nodemon -D
npm i express
npm i sequelize mysql2
npm i dotenv
npm install node-firebird
// moment().format('YYYY/MM/HH')
yarn add moment

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
git commit -m "msg - primeiro commit"



# renomear de master para main
git branch -M "main"

git push -u origin main
git remote add origin https://github.com/ivomarcarvalho/sequelize-demo2.git
git push -u origin main

// Busca o agendamento no horário especificado
const appointment = await Appointment.findOne({
  where: {
    date: hourStart,
    canceled_at: null
  }
});

if (appointment == null) {
  // Não existe, então cria o agendamento
  const appointment = await Appointment.create({
    user_id: req.userId,
    date,
    qualidade: 1
  });
} else if (appointment.quantidade < 6) {
  // Já existe e é válido, então atualiza a quantidade no banco
  appointment.quantidade += 1;
  await appointment.save();
} else {
  // Possui quantidade >= 6, então retorna o erro
  return res.status(400).json({ error: 'Agendamento já preenchido' });
}

// Retorna o agendamento
return res.json(appointment);

--------------------------------------------------------------
https://stackoverflow.com/questions/43962020/export-module-after-promise-completes

--------------------------------------------------------------