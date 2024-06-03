import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";

@Controller('security')
export class SecurityController{

    @EventPattern('user_authenticated')
    async handleUserAuthenticatedEvent(data:any){
        console.log("Evento de authenticación recibido", data);
    }
}