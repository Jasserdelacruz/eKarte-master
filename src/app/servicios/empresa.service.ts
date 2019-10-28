import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getLocalData()
  {
    return this.http.get("/assets/data/redditData.json");
  }

  getRemoteData()
  {
    return this.http.get (
      "https://ekarte-empresa.firebaseio.com/TarjetasEmpresa/.json?"
    )
  }

}

