import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelVmComponent } from './control-panel-vm.component';

describe('ControlPanelVmComponent', () => {
  let component: ControlPanelVmComponent;
  let fixture: ComponentFixture<ControlPanelVmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlPanelVmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlPanelVmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
