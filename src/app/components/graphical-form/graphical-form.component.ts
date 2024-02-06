import { Component, OnInit } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { EChartsOption } from 'echarts';
import { Observable, of } from 'rxjs';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-graphical-form',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './graphical-form.component.html',
  styleUrl: './graphical-form.component.scss',
  providers: [
    provideEcharts(),
  ]
})
export class GraphicalFormComponent implements OnInit {
  options: Observable<EChartsOption> | undefined;

  constructor(private calculatorService: CalculatorService) {
  }

  ngOnInit(): void {
    this.calculatorService.subjTree.subscribe(val => {
      console.log('subscribe subjTree', val);
      if(val) {
        // @ts-ignore
        this.options = of({
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
          },
          series: [
            {
              type: 'tree',
              data: val,
              top: '5%',
              left: '7%',
              bottom: '10%',
              right: '1%',
              symbolSize: 17,
              orient: 'vertical',
              label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 19,
              },
              leaves: {
                label: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left',
                },
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750,
            },
          ],
        });
      }
    })

  }
}
