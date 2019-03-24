const fs = require('fs');
const path = require('path');

const nameChaosFolder = "/chaos/";
const nameCleanFolder = "/clean/";

readDir = (pathFolder) => {
	const files = fs.readdirSync(pathFolder);
	// читаем папку. получаем массив элементов files 
	fs.readdir(pathFolder, (err, files) => {
		if (err) {
			console.log(err.message);
		} else {
			// проходимся по элементам массива
			files.forEach((name) => {
				// определяем путь к элементу папки
				const pathElement = path.join(pathFolder + "/" + name);
				let state = fs.statSync(pathElement);
				// проверка статуса элемента(папка или файл)
				if (state.isDirectory()) {
					readDir(pathElement);
				} else {
					const newFolderPath = path.join(__dirname + '/' + nameCleanFolder + '/' + name.slice(0, 1) + '/');
					// проверка на наличие такой папки
					if (!fs.existsSync(newFolderPath)) {
						fs.mkdirSync(newFolderPath)
					}
					// копируем файл и удаляем старый файл
					fs.copyFile(pathElement, path.join(newFolderPath + '/' + name), (err) => {
						if (err) {
							console.log(err);
						} else {
							fs.unlinkSync(pathElement);
						}
					});
				}
			})
		}
	})
}

readDir(path.join(__dirname + nameChaosFolder));