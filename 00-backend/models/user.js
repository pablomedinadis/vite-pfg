export class UserModel {
    static async getAll() {
        // return "Hola mundo";
        try {
            // Realiza la solicitud GET a la API
            const response = await fetch('http://127.0.0.1:5000/users');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Convierte la respuesta a JSON
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error('Error fetching data: ', error);
            return null;
        }
    }

    static async create(userData) {
        console.log(userData)
        //console.log(JSON.parse(newUser))
        // console.log("Data:")
        // console.log(JSON.stringify(userData))
        try {
            const response = await fetch('http://127.0.0.1:5000/create_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            console.log(response.ok)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error creating user: ', error);
            return null;
        }
    }

    static async getLang() {
        return "Hola mundo"
        //     try{
        //         const response = await fetch('http://127.0.0.1:5000/languages');
        //         if (!response.ok) {
        //             throw new Error(`HTTP error! status: ${response.status}`);
        //         }
        //     // Convierte la respuesta a JSON
        //     const data = await response.json();
        //     console.log(data)
        //     return data;
        // } catch (error) {
        //     console.error('Error fetching data: ', error);
        //     return null;
        // }
    }



}
