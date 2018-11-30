import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UtilService {

  constructor(
    public translate: TranslateService
  ) { }


  getPrimeFigure(amount){
    return amount.substring(0, amount.indexOf("."))
  }

  getCentsFigure(amount){
    return amount.substring(amount.indexOf("."), amount.length)
  }

  formatMoneyFromCentString(n) { 
    let num = parseFloat(n).toFixed(2);
    return (parseFloat(num)/100).toFixed(2);
  }

  formatMoney(n, currency="EUR") { 
    let num = parseFloat(n).toFixed(2);

    if (currency == "EUR"){
      num += " €"
    }
    
    return num;
  }

  formatExpDate(date){
    let today = new Date().getTime(); 
    let prevDate = new Date(date); 

    let daysAgo = ((today-prevDate.getTime())/1000)/(60*60*24);

    if (daysAgo <= 7){
      let dayTranslate = this.translate.instant("DAY_" + prevDate.getDay())
      return dayTranslate
    }else{
      return prevDate.toLocaleDateString();
    }

  }

}
