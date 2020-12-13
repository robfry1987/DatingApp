import { Component, OnInit } from '@angular/core';
import { Photo } from '../../_models/Photo';
import { AdminService } from '../../_services/admin.service';
import { ConfirmService } from '../../_services/confirm.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  photos: Partial<Photo[]>;

  constructor(private adminService: AdminService, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe(photos => {
      this.photos = photos;
    })
  }

  approvePhoto(photoId: number) {
    this.adminService.approvePhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
    })
  }

  rejectPhoto(photoId: number) {
    this.confirmService.confirm('Confirm Photo Rejection', 'This cannot be undone').subscribe(result => {
      if (result) {
        this.adminService.rejectPhoto(photoId).subscribe(() => {
          this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
        })
      }
    })
  }
}
