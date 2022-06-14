import { Game } from './game'
import { Npc } from "./Npc"


export class QuestTracker {
    //variables
    private allQuests: any
    private activeQuests: string[] = [] 
    private game: Game
    
    constructor(game: Game, quests: any){
        this.allQuests = quests
        this.game = game
    }
    
    //behavior
    // retrieves quest status of a specific quest, aka the progression stage
    public getQuestStatus(questName: string){
      let quest = this.allQuests.find((item: { questName: string }) => item.questName === questName)
      // console.log(quest)
      if(quest !== undefined){
        return quest.questStatus
      } else {
        return undefined
      }
    }

    // increases quest status of a specific quest by one. if the quest is in its last stage (aka status == length of stages), its marked as completed, and wont increase it by 1
    public setQuestStatus(questName: string) {
      let index = this.allQuests.findIndex((item: { questName: string }) => item.questName === questName)

      if(this.allQuests[index].questStatus < this.allQuests[index].stages.length - 1){ //checks if the quest is marked completed
        this.allQuests[index].questStatus++
      
        console.log(this.allQuests[index].questStatus)
        console.log(this.allQuests)
      }
    }

    // retrieves the name of the current stage of the quest. these should be the objective for the player, exceptions being "not started" and "completed"
    public getQuestStage(questName: string){
      let index = this.allQuests.findIndex((item: { questName: string }) => item.questName === questName)
      let stage = this.allQuests[index].stages[this.allQuests[index].questStatus]
      //console.log(stage)
      return stage
    }

    //QUEST LOAD HANDLING BELOW
    // switch function receives questname and calls a different function, 
    // containing the switch function specific to that quest, 
    // each case being a questStage value, 
    // which contains the code to execute to create whats needed for the quest to progress

    //checks which quest is being asked to update, and calls the corresponding function that handles the actual stages of the quest.
    public questJunction(questName: string) {
      switch(questName) {
          case "bunnyMurder" : 
              this.bunnyMurderQuest(questName)
              break;
          default :
              break;
      }
  }

  // handles the progression for the 1st quest, bunnyMurder.
  // **ALSO ACTS AS TEMPLATE, DO NOT DELETE COMMENTS**
  private bunnyMurderQuest(questName: string) {
      let status = this.getQuestStatus(questName)
      switch (status) {
          case 0:
              // quest got activated by talking to the NPC, advance the status and push questName into this.activeQuests[]
              console.log(this.getQuestStage(questName))
              this.setQuestStatus(questName)
              this.activeQuests.push(questName)
              break
          case 1:
              //code to create the next objective, which if completed advances the status. 
              // optionally, add an if statement to check for objective completion at the end,
              // in which status is advanced.
              break
          case 2:
              //repeat as case 1
              break
          //etc...
          // the last case should not advance the status, as it is then marked as complete, and has no further objectives
          // instead, it removes the quest from this.activeQuests[]
      }
  }
}