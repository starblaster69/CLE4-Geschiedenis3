import { Game } from './game'
import { Npc } from "./Npc"
//import { Dialog } from "./Dialog"

export class QuestTracker {
    //variables
    private quests: any
    private game: Game

    constructor(game: Game, quests: any){
        this.quests = quests
        this.game = game
    }
    
    //behavior
    public checkStatus(questName: string){
      let quest = this.quests.find((item: { questName: string }) => item.questName === questName)
      console.log(quest)
    }
}