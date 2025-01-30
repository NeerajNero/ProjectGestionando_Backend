import jwt from 'jsonwebtoken'
export const authCheck = async(req,res,next) => {
    try{
        const token = req.headers.authorization;
        if(!token && !token.startsWith(`Bearer `))
        {
            return res.status(401).json("Inavlid token")
        }
        const extractedToken = token.split(" ")[1];
        const checkToken = jwt.verify(extractedToken, process.env.SECRET_KEY)
        if(!checkToken){
            return res.status(403).json({error: "Invalid Token"})
        }
        req.user = {_id: checkToken.user._id,fullName: checkToken.user.fullName,email: checkToken.user.email}
        next()
    }catch(error){
        console.log("error occured while authenticating", error)
        next(error)
    }
}