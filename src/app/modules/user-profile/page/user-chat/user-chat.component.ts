import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebSocketService } from '@core/services/web-socket.service';
import {ChatMessageDTO} from "@app/models/chat-message-DTO";

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit, OnDestroy {

  chatForm: FormGroup;

  constructor(private fb: FormBuilder, public webSocketService: WebSocketService) {
    this.buildForm();
  }

  buildForm(): void {
    this.chatForm = this.fb.group({
      username: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  sendMessage(): void {
    const chatMessageDTO = new ChatMessageDTO(this.chatForm.value.username, this.chatForm.value.message);
    console.log(this.chatForm.value.username, this.chatForm.value.message);
    this.webSocketService.sendMessage(chatMessageDTO);
    this.chatForm.controls.message.reset();
  }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

}
