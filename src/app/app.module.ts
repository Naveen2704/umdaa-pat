import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule,MatButtonModule,MatIconModule, MatListModule, MatToolbarModule, DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { PatientprofileComponent } from './patientprofile/patientprofile.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { VitalsComponent } from './vitals/vitals.component';
import{MaterialModule} from '../app/material/material.module'
import { from } from 'rxjs';
import { FormsComponent } from './forms/forms.component';
import { ReportsComponent } from './reports/reports.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { HopiComponent } from './hopi/hopi.component';
import { HistoryComponent } from './history/history.component';
import { GpeComponent } from './gpe/gpe.component';
import { SeComponent } from './se/se.component';
import { OsComponent } from './os/os.component';
import { FiComponent } from './fi/fi.component';
import { SummaryComponent } from './summary/summary.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ExpandMenuDirective } from './expand-menu.directive';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { ProfileEditService } from './shared/profile-edit.service';
import { CheckListComponent } from './check-list/check-list.component';
import { ConfirmDailogComponent } from './confirm-dailog/confirm-dailog.component';
import { AddvitalsComponent } from './addvitals/addvitals.component';
import { OpendobComponent } from './opendob/opendob.component';
import { ClosedobComponent } from './closedob/closedob.component';
import { VitlasService } from './addvitals/vitlas.service';
import { MyDateAdapter, MY_DATE_FORMATS } from './format-datepicker';
import { AddreportsComponent } from './reports/addreports/addreports.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { GalleryModule } from  '@ngx-gallery/core';
import { LightboxModule } from  '@ngx-gallery/lightbox';
// import { LIGHTBOX_CONFIG } from '@ngx-gallery/lightbox';
// import { UpdatevitalsComponent } from './vitals/updatevitals/updatevitals.component';
import { ConfirmdailogComponent } from './shared/confirmdailog/confirmdailog.component';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { PrescribeComponent } from './fi/prescribe/prescribe.component';
import { ExaminsComponent } from './examins/examins.component';
import { FollowupComponent } from './followup/followup.component';
import { EditprescribeComponent } from './fi/editprescribe/editprescribe.component';
import { TemplateComponent } from './fi/template/template.component';
import { TemplatelistComponent } from './fi/templatelist/templatelist.component';
import { EditTempComponent } from './fi/edit-temp/edit-temp.component';
import { SeListComponent } from './se-list/se-list.component';
import { ServiceService } from './services/service.service';
import { PastHistoryComponent } from './history/past-history/past-history.component';
import { PersonalHistoryComponent } from './history/personal-history/personal-history.component';
import { TreatmentHistoryComponent } from './history/treatment-history/treatment-history.component';
import { FamilyHistoryComponent } from './history/family-history/family-history.component';
import { SocialHistoryComponent } from './history/social-history/social-history.component';
import { GpelistComponent } from './gpelist/gpelist.component';
import { OslistComponent } from './oslist/oslist.component';
import { PasthistorylistComponent } from './pasthistorylist/pasthistorylist.component';
import { PersonalhistorylistComponent } from './personalhistorylist/personalhistorylist.component';
import { TreatmenthistorylistComponent } from './treatmenthistorylist/treatmenthistorylist.component';
import { FamilyhistorylistComponent } from './familyhistorylist/familyhistorylist.component';
import { SocialhistorylistComponent } from './socialhistorylist/socialhistorylist.component';
import { HopilistComponent } from './hopilist/hopilist.component';
import { SketchDialogComponent } from './sketch-dialog/sketch-dialog.component';
import { TouchComponent } from './touch/touch.component';
import { PreviewComponent } from './preview/preview.component';
import { ListsComponent } from './lists/lists.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { PrescribemobileComponent } from './fi/prescribemobile/prescribemobile.component';
import { InvtempComponent } from './fi/invtemp/invtemp.component';
import { InvtemplistComponent } from './fi/invtemplist/invtemplist.component';
import { InvedittempComponent } from './fi/invedittemp/invedittemp.component';
import { WebpackComponent } from './webpack/webpack.component';
import { FudailogComponent } from './followup/fudailog/fudailog.component';
import { FudataComponent } from './followup/fudata/fudata.component';
import { AddChartsComponent } from './followup/add-charts/add-charts.component';
import { ChartsModule } from 'ng2-charts';
import { SortbyPipe } from './sortby.pipe';
import { SecondsektchComponent } from './secondsektch/secondsektch.component';
import { SpecialImageComponent } from './special-image/special-image.component';
import { AddproceduresComponent } from './procedures/addprocedures/addprocedures.component';
import { MoreformsComponent } from './moreforms/moreforms.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CformsComponent } from './cforms/cforms.component';
import { DisablecontrolDirective } from './disablecontrol.directive';
import { LoadingComponent } from './loading';
import { AddcformsComponent } from './cforms/addcforms/addcforms.component';
import { GentempComponent } from './fi/gentemp/gentemp.component';
import { GentemplistComponent } from './fi/gentemplist/gentemplist.component';
import { GentempeditComponent } from './fi/gentempedit/gentempedit.component';
import { SecondsketchComponent } from './secondsketch/secondsketch.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SketchComponent } from './sketch/sketch.component';
import { SpecialsketchComponent } from './specialsketch/specialsketch.component';
import { RmpsummaryComponent } from './rmpsummary/rmpsummary.component';
import { DateTimeFormatPipePipe } from './date-time-format-pipe.pipe';
import { EditLabComponent } from './edit-lab/edit-lab.component';
import { IpdComponent } from './ipd/ipd.component';
import { NewLinePipe } from './new-line.pipe';
import { IpdPrescriptionComponent } from './ipd-prescription/ipd-prescription.component';
import {OpenCVConfig} from 'ngx-document-scanner';
import {NgxDocumentScannerModule} from 'ngx-document-scanner';
import { ScanDocumentComponent } from './scan-document/scan-document.component';
import { VersiontwoComponent } from './versiontwo/versiontwo.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OcrComponent } from './ocr/ocr.component';
import { OcrdataComponent } from './ocrdata/ocrdata.component';
import { DrugeditComponent } from './drugedit/drugedit.component';
const openCVConfig: OpenCVConfig = {
  openCVDirPath: './assets/opencv'
};

@NgModule({
  declarations: [
    OcrComponent,
    LoadingComponent,
    AppComponent,
    SidenavComponent,
    PatientprofileComponent,
    VitalsComponent,
    FormsComponent,
    ReportsComponent,
    SymptomsComponent,
    HopiComponent,
    HistoryComponent,
    GpeComponent,
    SeComponent,
    OsComponent,
    FiComponent,
    SummaryComponent,
    ProceduresComponent,
    HeaderComponent,
    ProfileEditComponent,
    ExpandMenuDirective,
    DialogBodyComponent,
    CheckListComponent,
    ConfirmDailogComponent,
    AddvitalsComponent,
    ScanDocumentComponent,
    OpendobComponent,
    ClosedobComponent,
    AddreportsComponent,
    // UpdatevitalsComponent,
    ConfirmdailogComponent,
    PrescribeComponent,
    ExaminsComponent,
    FollowupComponent,
    EditprescribeComponent,
    TemplateComponent,
    TemplatelistComponent,
    EditTempComponent,
    SeListComponent,
    PastHistoryComponent,
    PersonalHistoryComponent,
    TreatmentHistoryComponent,
    FamilyHistoryComponent,
    SocialHistoryComponent,
    GpelistComponent,
    OslistComponent,
    PasthistorylistComponent,
    PersonalhistorylistComponent,
    TreatmenthistorylistComponent,
    FamilyhistorylistComponent,
    SocialhistorylistComponent,
    HopilistComponent,
    SketchDialogComponent,
    TouchComponent,
    PreviewComponent,
    ListsComponent,
    SuggestionsComponent,
    PrescribemobileComponent,
    InvtempComponent,
    InvtemplistComponent,
    InvedittempComponent,
    WebpackComponent,
    FudailogComponent,
    FudataComponent,
    AddChartsComponent,
    SortbyPipe,
    SecondsektchComponent,
    SpecialImageComponent,
    AddproceduresComponent,
    MoreformsComponent,
    CformsComponent,
    DisablecontrolDirective,
    AddcformsComponent,
    GentempComponent,
    GentemplistComponent,
    GentempeditComponent,
    SecondsketchComponent,
    SketchComponent,
    SpecialsketchComponent,
    RmpsummaryComponent,
    DateTimeFormatPipePipe,
    EditLabComponent,
    IpdComponent,
    NewLinePipe,
    IpdPrescriptionComponent,
    VersiontwoComponent  ,
    OcrdataComponent, 
    DrugeditComponent 
  ],
  imports: [
  
    
    AngularEditorModule,
    ChartsModule,
    RouterModule ,
    LightboxModule,
    GalleryModule,
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MaterialModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AutocompleteLibModule,
    NgMultiSelectDropDownModule,
    [NgxDocumentScannerModule.forRoot(openCVConfig)],
  ],
  entryComponents:[DrugeditComponent,ScanDocumentComponent,GentempComponent,GentemplistComponent,EditTempComponent,TemplatelistComponent,TemplateComponent,
    EditprescribeComponent,DialogBodyComponent,SymptomsComponent,SuggestionsComponent,
    ConfirmDailogComponent,AddvitalsComponent,OpendobComponent,EditLabComponent,
    ClosedobComponent,AddreportsComponent,ConfirmdailogComponent,
    SketchDialogComponent,SecondsektchComponent,SpecialImageComponent,PrescribemobileComponent,InvtempComponent,InvtemplistComponent,InvedittempComponent,FudailogComponent,FudataComponent,AddChartsComponent],
  providers: [
    ServiceService,
    ProfileEditService,
    DeviceDetectorService,
    VitlasService,
    { provide: LocationStrategy , useClass: HashLocationStrategy },
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
    { 
      provide: HAMMER_GESTURE_CONFIG, 
      useClass: HammerGestureConfig 
  }
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
