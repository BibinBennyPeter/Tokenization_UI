import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { error } from 'console';

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof Error && error.message === 'Name, email, and password are required') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const getUserById= async (req: Request, res: Response) => {
  try {
    const userid = req.params.id;
    const user = await userService.getUserById(userid);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const getUserByRole= async(req:Request,res:Response)=>{
  try{
    const role = req.params.id.toUpperCase();
    if(!['INVESTOR','LANDOWNER','COMPLIANCE'].includes(role)){
      throw new Error('Use the correct roles');
    }
    const users = await userService.getUserByRole(role);
    res.json(users)
  }catch(error){
    console.error("Error getting user by status",error);
    res.status(500).json({error:'Error fetching user detais'});
  }
} 
export const deactivateUser = async( req:Request,res:Response) => {
  try{
    const userid=req.params.id;
    const user= await userService.deactivateUser(userid);
    res.json(user);
  }catch(error) {
    console.error('Error deactivating user:', error);
    res.status(500).json({ error: 'Failed to deactivate user' });
  }
};
export const reactivateUser = async( req:Request,res:Response) => {
  try{
    const userid=req.params.id;
    const user= await userService.reactivateUser(userid);
    res.json(user);
  }catch(error) {
    console.error('Error deactivating user:', error);
    res.status(500).json({ error: 'Failed to deactivate user' });
  }
};