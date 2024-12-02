//  register

exports.registerController = (req,res) => {
    console.log("Inside controler");
    const {username,email,password} = req.body
    console.log(username,email,password);
    
    res.status(200).json("request recived")
}