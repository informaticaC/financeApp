const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const sendOTP = require('../utils/sendOTP');
const verifyOTP = require('../utils/verifyOTP');
const jwt = require("jsonwebtoken");


const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { firstname, username, phone, email,password, role} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    
    const body = {firstname, username, phone, email, password: hashPassword, role}
    const result = await User.create(body);
   
        // Llama a la función sendOTP para enviar el OTP
        const verification = await sendOTP(phone);

    
        return res.json({ result, verification});
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const verificarOTP = catchError(async (req, res) => {
    const {phone, code} = req.body;
   
   
      // Llama a la función verifyOTP para verificar el OTP
      const verification = await verifyOTP(phone, code);
      const user = await User.findOne( verification.phone ); // Encuentra el usuario por número de teléfono (ajusta según tu esquema)
      // Verifica el estado de la verificación (verificationResult.status)
      if (verification.status === 'approved') {
        // La verificación fue exitosa, puedes realizar acciones adicionales aquí
        user.isVerified = true; // Actualiza el campo isVerified a true
        await user.save(); 
        
        return res.json(user);
      } else {
        // La verificación falló, puedes manejar el error aquí
        return res.status(401).json({ error: 'Verificación fallida' });
      }
  });

  const login = catchError(async (req,res)=>{
    const {email, password} = req.body
    //verificacion email
    const user = await User.findOne({where:{email}})
    
    const isValidPassword = await bcrypt.compare(password,user.password )
    if(!isValidPassword) return res.sendStatus(401)
    if(!user.isVerified) return res.sendStatus(401)

    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn:"1d"}
    )

    return res.json({user, token})

});

///users/me

const logged = catchError(async(req,res)=>{
  const user = req.user
  return res.json(user)
});

const resetPassword = catchError(async (req,res)=>{
  const{phone} = req.body
    
  const user = await User.findOne({where:{phone}})
  if(!user) return res.sendStatus(401)

  await sendOTP(phone);
  
  return res.json(user)
});

const updatePassword = catchError(async (req,res)=>{
  // /reset_password/:code


  const {phone,code,password} = req.body
  const chance = await User.findOne({where:{phone}});
  if(chance) {
      const verification = await verifyOTP(phone, code);
      if(verification === "approved") {
        const hashPassword = await bcrypt.hash(password,10)
        const body = {password:hashPassword}
        const user = await User.update(body,{where:{password}})
        return res.json(user)
      }
    }
 
  
});

  
 

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    verificarOTP,
    login,
    logged,
    resetPassword,
    updatePassword
}