export class MainDataModel {
    static async getAll() {
        try{
            const response = await fetch('http://127.0.0.1:5000/getAllInfo');
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
}