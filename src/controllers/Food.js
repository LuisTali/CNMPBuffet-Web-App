import { getConnection,querys,sql } from "../database";

export const getAllFoods = async(req,res,user=undefined)=>{
    try {
    
        const pool = await getConnection();
        let result = await pool.request().query(querys.getAllFoods);
        
        //console.log(user);
        /*if(user!==undefined){
            res.render('home.handlebars',{success:true, foods:result.recordset, User:user, admin:user.getAdmin(), msg:`Welcome back ${user.getUsername()}`})
        }*/
        /*Usado para no volver a escribir todos los platos en otro archivo a mano
        console.log(path.join(__dirname, '../dataAux/food.json'))
        const data = JSON.stringify(result.recordset);
        fs.writeFile(path.join(__dirname, '../dataAux/food.json'),data,'utf8',(res,error)=>{
            if(error){
                console.log(`Error: ${error}`);
            }else{ console.log('Escritura satisfactoria');}
        });*/

        res.render('home.handlebars',{admin:false,foods:result.recordset});
    } catch (error) {
        return res.status(400).json({success:false,msg:error.message});
    }
}

export const getFoodById = async(req,res)=>{
    let {id} = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request().input("id",sql.Int,id).query(querys.getFoodById);
        console.log(result.recordset[0]);
        if(result.recordset[0] === undefined){ return res.status(400).json({success:false,msg:'There is not a food with that id'}) }
        res.render('foodDetails.handlebars',{admin:true,foodDay: result.recordset[0]});
    } catch (error) {
        return res.status(400).json({success:false,msg:error.message});
    }
}

export const showEditDailyDish = async(req,res)=>{
    try {
        res.render('editDailyDish.handlebars');
    } catch (error) {
        return res.status(400).json({success:false,msg:error.message});
    }
}

//Para obtener las comidas desde el Controller Auth
export const getFoodsValues = async()=>{
    try {
        const pool = await getConnection();
        let result = await pool.request().query(querys.getAllFoods);
        return result.recordset;
    } catch (error) {
        return json({success:false,msg:error.message});
    }
}