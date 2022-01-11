import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientprofileComponent } from './patientprofile/patientprofile.component';
import { VitalsComponent } from './vitals/vitals.component';
import { FormsComponent } from './forms/forms.component';
import { ReportsComponent } from './reports/reports.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { HopiComponent } from './hopi/hopi.component';
import { GpeComponent } from './gpe/gpe.component';
import { SeComponent } from './se/se.component';
import { OsComponent } from './os/os.component';
import { FiComponent } from './fi/fi.component';
import { SummaryComponent } from './summary/summary.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { HistoryComponent } from './history/history.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { CheckListComponent } from './check-list/check-list.component';
import { ExaminsComponent } from './examins/examins.component';
import { FollowupComponent } from './followup/followup.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { SeListComponent } from './se-list/se-list.component';
import { GpelistComponent } from './gpelist/gpelist.component';
import { OslistComponent } from './oslist/oslist.component';
import { PasthistorylistComponent } from './pasthistorylist/pasthistorylist.component';
import { TreatmenthistorylistComponent } from './treatmenthistorylist/treatmenthistorylist.component';
import { PersonalhistorylistComponent } from './personalhistorylist/personalhistorylist.component';
import { SocialhistorylistComponent } from './socialhistorylist/socialhistorylist.component';
import { FamilyhistorylistComponent } from './familyhistorylist/familyhistorylist.component';
import { HopilistComponent } from './hopilist/hopilist.component';
import { TouchComponent } from './touch/touch.component';
import { PreviewComponent } from './preview/preview.component';
import { ListsComponent } from './lists/lists.component';
import { WebpackComponent } from './webpack/webpack.component';
import { AddproceduresComponent } from './procedures/addprocedures/addprocedures.component';
import { MoreformsComponent } from './moreforms/moreforms.component';
import { CformsComponent } from './cforms/cforms.component';
import { AddcformsComponent } from './cforms/addcforms/addcforms.component';
import { SecondsketchComponent } from './secondsketch/secondsketch.component';
import { SketchComponent } from './sketch/sketch.component';
import { SpecialsketchComponent } from './specialsketch/specialsketch.component';
import { RmpsummaryComponent } from './rmpsummary/rmpsummary.component';
import { IpdComponent } from './ipd/ipd.component';
import { PrescribeComponent } from './fi/prescribe/prescribe.component';
import { IpdPrescriptionComponent } from './ipd-prescription/ipd-prescription.component';
import { VersiontwoComponent } from './versiontwo/versiontwo.component';
import { OcrComponent } from './ocr/ocr.component';
import { OcrdataComponent } from './ocrdata/ocrdata.component';


const routes: Routes = [
  { path: '',
    //redirectTo: 'Patientprofile/:id/:id1',
    redirectTo: 'Vitals/:id/:id1',
    pathMatch: 'full'
  },
  // { path: 'header/:id', component: HeaderComponent },
  { path: 'Patientprofile/:id/:id1', component: PatientprofileComponent },
  { path: 'Vitals/:id/:id1', component: VitalsComponent },
  { path: 'Forms/:id/:id1', component: FormsComponent },
  { path: 'Reports/:id/:id1', component: ReportsComponent },
  { path: 'Symptoms', component: SymptomsComponent },
  // { path: 'Hopi/:id', component: HopiComponent },
  { path: 'History/:id/:id1', component: HistoryComponent},
    
  { path: 'GPE/:id/:id1', component: GpeComponent },
  { path: 'SE/:id/:id1', component: SeComponent },
  { path: 'OS/:id/:id1', component: OsComponent },
  { path: 'Fi/:id/:id1', component: FiComponent },
  { path: 'Summary/:id/:id1', component: SummaryComponent },
  { path: 'Procedures/:id/:id1', component: ProceduresComponent },
  { path: 'moreforms/:id/:id1', component: MoreformsComponent },
  { path: 'cforms/:id/:id1', component:CformsComponent },
  { path: 'addcforms/:id/:id1/:id2', component: AddcformsComponent },
  { path: 'checkList/:id/:id1', component: CheckListComponent },

  { path: 'addprocedure/:id/:id1/:id2', component: AddproceduresComponent },
  { path: 'profile_edit', component: ProfileEditComponent },

  { path: 'Examins/:id/:id1', component: ExaminsComponent },
  { path: 'f/u/:id/:id1', component: FollowupComponent },
  { path: 'SeList/:id', component:  SeListComponent},
  { path: 'GpeList/:id', component:  GpelistComponent},
  { path: 'OsList/:id', component:  OslistComponent},
  { path: 'PastHistoryList/:id', component:  PasthistorylistComponent},
  { path: 'TreatmentHistoryList/:id', component:  TreatmenthistorylistComponent},
  { path: 'PersonalHistoryList/:id', component:  PersonalhistorylistComponent},
  { path: 'FamilyHistoryList/:id', component:  FamilyhistorylistComponent},
  { path: 'SocialHistoryList/:id', component:  SocialhistorylistComponent},
  { path: 'HopiList/:id', component:  HopilistComponent},
  { path: 'touch/:id3/:id/:id2/:id4', component:  TouchComponent},
  { path: 'preview/:id/:id4/:id2/:id3/:id5', component:  PreviewComponent},
  { path: 'Lists/:id/:id1', component:  ListsComponent},
  { path: 'webpack', component:  WebpackComponent},

  { path: 'sketch/:id/:id1/:id2', component:SketchComponent},
  { path: 'secondsketch/:id/:id1/:id2', component:SecondsketchComponent},
  { path: 'special/:id/:id1/:id2/:id3', component:SpecialsketchComponent},
  { path: 'rmpsummary/:id/:id1', component:RmpsummaryComponent},
  { path: 'ipd/:id/:id1', component:IpdComponent},
  { path: 'prescribe', component:PrescribeComponent},
  { path:'ipdPrescription/:id/:id1',component:IpdPrescriptionComponent},
  { path:'version2/:id/:id1/:id2',component:VersiontwoComponent},
  { path:'ocr/:id/:id1',component:OcrComponent},
  { path:'ocrData/:id/:id1',component:OcrdataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
