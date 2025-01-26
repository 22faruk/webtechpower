import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IDirectory} from '../../models/subject';
import {SubjectResponse} from '../../models/response/subject-response';

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
    return this.http.get<SubjectResponse>(`${environment.api}/subjects/`);
  }

  // getDirectories(subjectId: string){
  //   return this.http.get<{message: string, data: IDirectory[]}>(`${environment.api}/subjects/${subjectId}`)
  // }
  updateSubject(subjectId: string, subjectName: string){
    return this.http.patch(`${environment.api}/subjects/${subjectId}`,{ subjectName })
  }
  updateDirectory(subjectId: string,directories: IDirectory[]){
    return this.http.patch(`${environment.api}/subjects/${subjectId}/directories`,{ subjectId, directories })
  }
  deleteSubject(subjectId: string){
    return this.http.delete(`${environment.api}/subjects/${subjectId}`)
  }
}
