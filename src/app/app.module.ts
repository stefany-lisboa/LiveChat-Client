import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './main/chat/chat.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './main/menu/menu.component';
import { SearchBarComponent } from './main/search-bar/search-bar.component';
import { OpenConversationsComponent } from './main/open-conversations/open-conversations.component';
import { ChannelService } from './services/channel.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ChatComponent,
    MenuComponent,
    SearchBarComponent,
    OpenConversationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
  ],
  providers: [HttpClient, ChannelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
