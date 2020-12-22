import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Photo } from '../_models/Photo';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserWithRoles() {
    return this.http.get<Partial<User[]>>(this.baseUrl + "admin/users-with-roles");
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post(this.baseUrl + "admin/edit-roles/" + username + "?roles=" + roles, {});
  }

  getPhotosForApproval() {
    return this.http.get<Partial<Photo[]>>(this.baseUrl + "admin/photos-to-moderate");
  }

  approvePhoto(photoId: number) {
    return this.http.post(this.baseUrl + "admin/approve-photo/" + photoId, {});
  }

  rejectPhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'admin/reject-photo/' + photoId);
  }
}