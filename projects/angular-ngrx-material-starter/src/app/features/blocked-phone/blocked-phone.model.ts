export interface BlockedPhone {
    blockedPhoneNumber : string; //Numéro de téléphone bloqué
    blockedPhoneForWho : any; //Qui est bloqué par le téléphone
    blockedPhoneByWho : string; //Qui a bloqué le téléphone
    blockedPhoneDate : string; //Quand le blocage a été fait
    blockedPhoneDateLastModification : string; //Quand le blocage a été modifié
    blockedPhoneLastCalled : string; //Quand le téléphone a été appelé pour la dernière fois
    blockedPhoneCallCount : number; //Nombre d'appels depuis le blocage
    blockedPhoneActive : boolean; //Le blocage est-il actif
}


