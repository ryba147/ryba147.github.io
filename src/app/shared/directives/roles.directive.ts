import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '@core/services/user.service';

@Directive({
  selector: '[roles]',
  inputs: ['roles'],
})
export class RolesDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private containerRef: ViewContainerRef,
    private userService: UserService
  ) {}

  @Input() set roles(allowedRole: string) {
    let haveAccess = false;
    const userRole = this.userService.getUser().role;

    if (userRole.toLowerCase() === allowedRole) {
      haveAccess = true;
    }

    if (haveAccess) {
      this.containerRef.createEmbeddedView(this.templateRef);
    } else {
      this.containerRef.clear();
    }
  }
}
