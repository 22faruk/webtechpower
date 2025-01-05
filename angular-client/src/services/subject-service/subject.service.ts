import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import ISubject, {IDirectory} from '../../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  http = inject(HttpClient);

  constructor() { }

  createSubject(subjectName:string){
    return this.http.post(`${environment.api}/subjects/`, { subjectName }
      )
  }
  getSubjects() {
    return this.http.get<{message: string, data: ISubject[]}>(`${environment.api}/subjects/`);
  }

  getDirectories(subjectId: string){
    return this.http.get<{message: string, data: IDirectory[]}>(`${environment.api}/subjects/${subjectId}`)
  }
  // updateDirectories(subjectId: string, directories: string){
  //   return this.http.put(`${environment.api}/subjects/${subjectId}`,{
  //     params: { subjectId, directories }
  //   })
  // }
  updateSubject(subjectId: string, subjectName: string, directories: IDirectory[]){
    return this.http.patch(`${environment.api}/subjects/${subjectId}`,{ subjectName, directories })
  }
  deleteSubject(subjectId: string){
    return this.http.delete(`${environment.api}/subjects/${subjectId}`)
  }
}
