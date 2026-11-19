import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

const users: User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John',
        age: 23
    }
]

@Injectable()
export class UsersService {

    //PERMET DE RECUPERER TOUS LES USERS DU TABLEAU
    getAll(): User[] {
        return users;
    }

    //PERMET DE RECUPERER UN USER AVEC SON ID
    getById(id: number): User {
        return users.filter(user => user.id === id)[0];
    }

    //PERMET DE RAJOUTER UN USER DANS LE TABLEAU
    create(lastname: string, firstname: string, age: number): User {
        const newUser = { id: users.length, lastname: lastname, firstname: firstname, age: age };
        users.push(newUser);
        return newUser;
    }

    //PERMET DE MODIFIER LE NOM, LE PRENOM ET/OU L'AGE D'UN USER
    update(id: number, firstname: string, lastname: string, age: number): User {
        const user = this.getById(id);
        if (firstname !== undefined) user.firstname = firstname;
        if (lastname !== undefined) user.lastname = lastname;
        if (age !== undefined) user.age = age;
        return user;
    }

    //PERMET DE SUPPRIMER UN USER AVEC SON ID
    delete(id: number): boolean {
        const user = this.getById(id);
        users.splice(users.indexOf(user), 1);
        return true;
    }

}
