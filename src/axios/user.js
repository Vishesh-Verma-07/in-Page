import axios from "axios";

export class AuthService  {
async internshipFormSubmit(data){
    try {
        const response =  await axios.post("/api/internship/apply", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        return response

    } catch (error) {
        throw error;
    }
}
}