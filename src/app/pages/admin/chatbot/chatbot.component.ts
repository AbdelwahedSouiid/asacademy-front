import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../../services/message/message.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Message} from "../../../model/message.model";
import {AppUser} from "../../../model/user.model";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']  // Correction pour styleUrls
})
export class ChatbotComponent implements OnInit {

  chatForm: FormGroup;
  message!: Message;
  messageList: Message[] = [];
  currentUser!: AppUser;

  constructor(private messageService: MessageService, private fb: FormBuilder, private userService: UserService) {
    this.chatForm = this.fb.group({
      userQuestion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getMessages();
    this.loadCurrentUser();
  }

  handleAskBot() {
    if (this.chatForm.valid) {
      // Créer l'objet message avec uniquement la question de l'utilisateur
      const newMessage: Message = this.chatForm.value;

      console.log(newMessage);  // Affichage de la question pour débogage

      this.messageService.addMessage(newMessage).subscribe(
        data => {
          this.message = data;
          // Ajouter le message à la liste
          this.messageList.push(data);
          // Réinitialiser le formulaire après envoi
          this.chatForm.reset();
        },
        error => {
          console.log(error);
        }
      );
    }
  }


  getMessages() {
    this.messageService.getMessages().subscribe(
      data => {
        this.messageList = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadCurrentUser(): void {
    const authUser = localStorage.getItem('authUser');
    const email = authUser ? JSON.parse(authUser).email : null;
    this.userService.getUser(email).subscribe({
      next: data => {
        this.currentUser = data;
      }
    });
  }
}
