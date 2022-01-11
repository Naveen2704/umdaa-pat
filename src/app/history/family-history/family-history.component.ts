import { Component, OnInit } from '@angular/core';
import { FamilyHistoryService } from '../family-history.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
import { UsersService } from 'src/app/services/users.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { SketchDialogComponent } from 'src/app/sketch-dialog/sketch-dialog.component';
import { SpecialImageComponent } from 'src/app/special-image/special-image.component';
import { PatientserviceService } from 'src/app/service/patientservice.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-family-history',
  templateUrl: './family-history.component.html',
  styleUrls: ['./family-history.component.css']
})

export class FamilyHistoryComponent implements OnInit {
  // export class FinalSeComponent implements OnInit {
    id: string;
    mainData: any=[];
    heading: any=[];
    form_name: any;
    array123: any=[];
    sub_heading: any=[];
    sub_headingg: any = [];
    arrayObj: any=[];
    removeformId: any;
    checkcheck: any=[];
    dd: any=[];
    main_section: any=[];
    hideButton:boolean = false;
    listName: boolean =false;
    listData: any=[];
  specialSection_id: any;
  getPreviewOne: any =[];
  impIds: any=[];
  id1: string;
  status: any;
  disabled: boolean = false;
  
    constructor(private _service: PatientserviceService,private users: UsersService,public dialog: MatDialog,private se:FamilyHistoryService, private route: ActivatedRoute,private router: Router,public _notification:NotificationService) { }
  
    ngOnInit() {
      this.route.params.subscribe(res => {
        this.id = this.route.snapshot.paramMap.get("id");
        this.id1 = this.route.snapshot.paramMap.get("id1");
        this.users.roleId(this.id1);
        this._service.GetPatient(this.id).subscribe(data =>{
          console.log(data.result['parameters'][0])
          // this.obj_Sy = data.result['parameters'][0]
          this.status = data.result['parameters'][0].status
          if(this.status === 'closed'){
            this.disabled = true
          }
      
         })
        this.getModifiedSe()
        this.getListDetails(this.id)
      }); 
    }
  
    getModifiedSe()
    {
        this.se.getSeMainData(this.id).subscribe((data)=>{
        console.log(data)
        console.log(data['result']);
          this.mainData = data['result']['form_information'];
          console.log(this.mainData);
          console.log(this.mainData);
          console.log(this.mainData[0].form_id,this.mainData[0].form_name);
          this.onClick(this.mainData[0].form_id,this.mainData[0].form_name);
      });
    }
  
    onClick(dataa,name)
    {   
       console.log(dataa,name);
       this.form_name = name;
       this.removeformId = dataa;
       this.se.getSeInnerHeading(dataa).subscribe((res)=>{
         console.log(res);
         console.log(res['result']['heading']);
         this.heading = res['result']['heading'];
         for(var i=0;i<this.heading.length;i++)
         {
            if(this.heading[i].image_path != '')
            {
              var result = this.impIds.filter((x) => x.id === this.heading[i].section_id);
              console.log(result);
              console.log(this.impIds);
              if(result == '')
              {
                this.impIds.push({id:this.heading[i].section_id});
                console.log(this.impIds);
              }
        
            }
         }
      });
      this.loadData();
    }
  
    //open section data
    addCreds(a,b)
    {
      console.log(this.array123);
      console.log(a,b);
     this.se.getInnerSubHeadings(a,b).subscribe((res)=>{
       console.log(res);
       console.log(res['result']['sub_heading']);
        this.sub_headingg = res['result']['sub_heading'];
        console.log(this.sub_headingg);
        var filterSubHeading = this.sub_heading.filter((x)=>x.id === b);
        console.log(filterSubHeading);
        if(filterSubHeading == '')
        {
           this.sub_heading.push({id:b,data:this.sub_headingg});
           console.log(this.sub_heading);
           var filterData = this.sub_heading.filter((y)=>y.id === b);
           console.log(filterData);
           console.log(filterData[0].data);
           for(var x=0;x<filterData[0].data.length;x++)
           {
                // console.log(filterData[0].data[x]);
                // console.log(filterData[0].data[x].parent_section_id);
                // console.log(filterData[0].data[x].form_id);
                // console.log(filterData[0].data[x].format_type);
                // console.log(filterData[0].data[x].field_name);
                // console.log(filterData[0].data[x].field_name.length);              
                for(let k=0;k<filterData[0].data[x].field_name.length;k++)
                {
                  if(filterData[0].data[x].field_name[k].field_type == 'radio')
                  {
                    for(let j=0;j<filterData[0].data[x].field_name[k].field_option.length;j++)
                    {
                      let lateData =filterData[0].data[x].field_name[k].field_name;
                      if(filterData[0].data[x].field_name[k].field_option[j].option_default == 1)
                      {
                        let latevalue =filterData[0].data[x].field_name[k].field_option[j].option_name;
                        let lateId =filterData[0].data[x].field_name[k].field_option[j].option_id;
                        this.array123.push({format:filterData[0].data[x].format_type,
                        label_id:filterData[0].data[x].field_name[k].field_id,
                        label_value:filterData[0].data[x].field_name[k].field_name,option_id:lateId,
                        option_value:latevalue,parent_label_id:0
                        ,section_id:filterData[0].data[x].parent_section_id,form_id:a})
                        console.log(this.array123);
                      }
                      
                      
                    }
                    
                  }
            
              
                }
           }
        }
     });
    }
  
    removeArrayData(a,b)
    {
      console.log(a,b);
      console.log(this.array123);
      this.array123 = this.array123.filter((x=>x.section_id !== b));
      console.log(this.array123);
    
      this.sub_heading = this.sub_heading.filter((x)=>x.id !== b);
      console.log(this.sub_heading);
      this.dd = this.dd.filter((x)=>x.section_id !== b);
      console.log(this.dd);
      this.main_section = this.main_section.filter((x)=>x.section_id !== b);
      console.log(this.main_section);
      (<HTMLInputElement>document.getElementById('myInput'+b)).value = '';
      // Swal.fire('','Changes are lost','warning')
    }
  
    checkbox(id,removeformId,f_type,z,r_number,pft,s,f,o)
    {      
      console.log(id,removeformId,f_type,z,r_number,pft,s,f,o);
      this.se.dataDependenciessss(removeformId,f_type,r_number,pft,s,f,o).subscribe((data)=>{
        console.log(data)
        console.log(data['result']['dependency'])
        this.checkcheck = data['result']['dependency'];
        console.log(this.checkcheck);
  
        for(var z=0;z<this.checkcheck.length;z++)
        {
            if(this.checkcheck[z].field_type == 'radio')
            {
              for(let j=0;j<this.checkcheck[z].radio_list.length;j++)
              {
                let lateData = this.checkcheck[z].radio_list[j].option_name;
                if(this.checkcheck[z].radio_list[j].option_default == 1)
                {
                  let latevalue =this.checkcheck[z].radio_list[j].option_name;
                  let lateId =this.checkcheck[z].radio_list[j].option_id;
                  this.array123.push({format: this.checkcheck[z].radio_list[j].format_type,
                  label_id:this.checkcheck[z].radio_list[j].field_id,
                  label_value:this.checkcheck[z].field_name,option_id:lateId,
                  option_value:this.checkcheck[z].radio_list[j].option_name,
                  test_id:this.checkcheck[z].parent_field_id,
                  parent_label_id:0,section_id:id,
                  form_id:removeformId})
                   console.log(this.array123);
                }
                
                
              }
            }
        }
  
        if(pft === 'radio')
        {
            var filterrr = this.dd.filter((item)=>item.parent_field_id  === f);
            if(filterrr == '')
            {
              this.dd.push({parent_field_id:f,section_id:id,name:this.checkcheck});
              console.log(this.dd);
            }
            else
            {
              Object.assign(this.dd.find(b => b.parent_field_id === f),{parent_field_id:f,name:this.checkcheck});
              console.log(this.dd);
            }       
        }
        else if(pft === 'checkbox')
        {
          var filterrr = this.dd.filter((item)=>item.field_id  === o);
          console.log(filterrr);
          if(filterrr == '')
          {
          this.dd.push({parent_field_id:f,field_id:o,section_id:id,name:this.checkcheck});
          console.log(this.dd);
          
          }
          else{
            this.dd = this.dd.filter((item)=>item.field_id !== o)
            console.log(this.dd);
          }
  
        }
        else{
  
        }
      });
    }
  
  
    
    abcde(p_id,removeformId,s,f,id,a,b,c)
    {
      console.log(p_id,removeformId,s,f,id,a,b,c);
      // console.log(f,id,a,b,c);
      // console.log(this.array123);
      var result = this.array123.filter((x) => x.label_id === id);
      console.log(result);
  
      if(result === '')
      {
        this.array123.push({format:f,label_id:id,
          label_value:b,option_id:a,
          option_value:c,parent_label_id:0,section_id:s,form_id:removeformId,test_id:p_id});
          console.log(this.array123);
      }
      else
      {
        this.array123 = this.array123.filter((y)=>y.label_id !== id && y.test_id !== id);
        console.log(this.array123);
        this.array123.push({format:f,label_id:id,
        label_value:b,option_id:a,
        option_value:c,parent_label_id:0,section_id:s,form_id:removeformId,test_id:p_id});
        console.log(this.array123);
      }
    }
  
      //checkboxes
  
      ab(removeformId,s,f,mainid,did,dlabelText,otext,e)
      {
        console.log(s,f,mainid,did,dlabelText,otext,e);
        console.log(did,dlabelText,otext,e.checked);
        console.log(e.checked);
    
        var result121 = this.array123.filter(x => x.option_id === dlabelText);
        console.log(result121);
        if(result121 == '')
        {
          // this.array12.push({id:did,label:dlabelText,value:otext});
          this.array123.push({format:f,label_id:mainid,
            label_value:did,option_id:dlabelText,
            option_value:otext,parent_label_id:0,section_id:s,form_id:removeformId});
         console.log( this.array123);
        }
    
        if(e.checked == false)
        {
          this.array123 = this.array123.filter((z)=>z.option_id !== dlabelText);
          console.log(this.array123);
          // Object.assign(this.array123.find(ba => ba.option_id === dlabelText),{option_value: "unchecked"});
          // console.log(this.array123);
        }
    
        if(e.checked == true)
        {
          Object.assign(this.array123.find(b => b.option_id === dlabelText),{option_value: otext});
          console.log(this.array123);
        }
    
      }
  
   //text boxes
    abcdef(removeformId,test_id,s,f,did,text,id,e)
    {
      // console.log(s,f,did,text,id,b,a,c,e);
      console.log(removeformId,test_id,s,f,did,text,id,e.target.value);
      var result = this.array123.filter(x => x.label_id === f);
      console.log(result);
      if(result == '')
      {
  
          this.array123.push({format:s,label_id:f,
            label_value:did,option_id:text,
            option_value:e.target.value,parent_label_id:0,test_id:test_id,section_id:id,form_id:removeformId});
            console.log(this.array123);
  
      }
  
      else if(e.target.value == '')
      {
        // Object.assi gn(this.array123.find(b => b.label_id === f),{option_value: e.target.value});
        // console.log(this.array123);
        this.array123 = this.array123.filter((z)=>z.label_id !== f);
        console.log(this.array123);
      }
  
      else
      {
        Object.assign(this.array123.find(b => b.label_id === f),{option_value: e.target.value});
        console.log(this.array123);
        // this.array123 = this.array123.filter((z)=>z.label_id !== f && z.test_id !== f);
        // console.log(this.array123);
      }
    }
  
    mainTwo(id,title,e)
    {
      console.log(id,title,e.target.value);
      var filterMainSection= this.main_section.filter((x)=>x.section_id === id);
      console.log(filterMainSection);
  
      if(filterMainSection == '')
      {
        this.main_section.push({section_id:id,section_description:e.target.value});
        console.log(this.main_section);
      }
      else if(e.target.value == '')
      {
          this.main_section = this.main_section.filter((x)=>x.section_id !== id);
          console.log(this.main_section);
      }
      else
      {
         Object.assign(this.main_section.find(y=>y.section_id ===id),{section_description:e.target.value});
         console.log(this.main_section);
      }
  
    }
    
    loadData()
    {
      setTimeout(()=>{  
        this.hideButton = true;
   }, 300);
    }


    final(removeformId)
    {
      console.log(this.form_name,this.removeformId);
      console.log(this.id);
       console.log(this.array123);
       console.log(this.array123.length);
       console.log(this.main_section);
       console.log(this.impIds);     

       var getInfo1 = localStorage.getItem('Family'+this.id+'1');
       var getInfo2 = localStorage.getItem('Family'+this.id+'2');
      //  var getInfo3 = localStorage.getItem('SESpecialImage,');
      //  var base64Img = "data:image/png;base64,AAA=";
      for(var j=0;j<this.impIds.length;j++)
      {
        var getInfo3 = localStorage.getItem('Family'+this.id+this.impIds[j].id);
        if(getInfo3 != null)
        {
          // console.log(getInfo3);
        getInfo3 = getInfo3.replace("data:image/jpeg;base64,", "");
        var filterMainSection= this.main_section.filter((x)=>x.section_id === this.impIds[j].id);
        console.log(filterMainSection);
    
        if(filterMainSection == '')
        {
          this.main_section.push({section_description:'',section_id:this.impIds[j].id,section_image:getInfo3});
         console.log(this.main_section);
        }
        else{
          Object.assign(this.main_section.find(y=>y.section_id ===this.impIds[j].id),{section_image:getInfo3});
         console.log(this.main_section);
        }
        
        }
        
        // if(getInfo3 != null)
        // {
        // getInfo3 = getInfo3.replace("data:image/png;base64,", "");
        // console.log(getInfo3);
        // this.main_section.push({section_image:getInfo3});
        //  console.log(this.main_section);
        // }
      }
        // console.log(getInfo3);
      if(getInfo1 != null)
      {
        getInfo1 = getInfo1.replace("data:image/jpeg;base64,", "");
        // console.log(getInfo1);
        this.getPreviewOne.push(getInfo1);
      }
      if(getInfo2 != null)
      {
        getInfo2 = getInfo2.replace("data:image/jpeg;base64,", "");
        // console.log(getInfo2);
        this.getPreviewOne.push(getInfo2);
      }

      // if(getInfo3 != null)
      // {
      //   getInfo3 = getInfo3.replace("data:image/png;base64,", "");
      //   console.log(getInfo3);
      //   this.main_section.push({section_image:getInfo3});
      //    console.log(this.main_section);
      // }
   
       console.log(this.getPreviewOne);
       if(this.array123.length != 0)
       {
        this.se.saveData(this.id,removeformId,this.array123,this.main_section,this.getPreviewOne).subscribe((data)=>{
          console.log(data)
          console.log(data.code)
          console.log(this.main_section)
          if(data.code == 200)
          {
              this.se.getList(this.id).subscribe((data)=>{
                console.log(data);
                Swal.fire('','SuccessFully Saved','success')
                console.log(data['result']['forms']);
                this.router.navigate(['/FamilyHistoryList/'+this.id]);
              });
              localStorage.removeItem('Family'+this.id+'1');
              localStorage.removeItem('Family'+this.id+'2');
              for(var j=0;j<this.impIds.length;j++)
              {
                localStorage.removeItem('Family'+this.id+this.impIds[j].id);
              }
          }
        });
       }
       else{
        Swal.fire('','No Data Selected','error')
         console.log("No Data Selected");
       }
  
      //  setTimeout(function() { this.hide = true; }, 10000);
    }
  

        
    
    getListDetails(id)
    {
      this.se.getList(id).subscribe((data)=>{
        console.log(data);
        console.log(data['result']['forms']);
        this.listData = data['result']['forms'];
        console.log(this.listData.length);
        if(this.listData.length > 0)
        {
          this.listName = true;
        }
      });

    }

    verifyList()
    {
      this.router.navigate(['/FamilyHistoryList/'+this.id]);
    }

    open(a)
    {     
      this.router.navigate(['/touch/'+this.id+'/'+a,this.removeformId,this.id1]);
    }
  
    
    form_images(a,b)
    {
      console.log(a);
      this.specialSection_id = b;
      this.router.navigate(['/preview/'+'Family/'+this.id+'/'+b,a,this.id1]);
    }
  
    openDialog(){
      this.router.navigate(['/secondsketch/'+'Family/'+this.id+'/'+this.id1]);
     
    }


    checkImage(a,b)
    {
      this.router.navigate(['/special/'+'Family/'+this.id+'/'+b+'/'+a]);
  
    }

  
  
  }
