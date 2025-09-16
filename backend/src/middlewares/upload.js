const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Pasta onde os arquivos serão salvos
const uploadDir = path.join(__dirname, '../../uploads/itens');

// Se a pasta não existir, cria
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Gera nome único: timestamp-nomeoriginal
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage });

module.exports = upload;
