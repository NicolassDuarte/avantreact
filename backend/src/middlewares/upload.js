const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pasta onde as imagens serão salvas
const uploadFolder = path.join(__dirname, '..', 'uploads');

// Cria a pasta se não existir
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        // Gera nome único para a imagem
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname); // mantém a extensão original
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// Filtra apenas imagens
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
