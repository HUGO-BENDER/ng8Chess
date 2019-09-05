import { Directive, ElementRef, HostListener, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[chessFramePanZoom]'
})
export class FramepanzoomDirective implements AfterViewInit {
  // -- var DOM
  elementFrame: any;
  rectFrame: Rectangle;
  elementContent: any;
  rectContent: Rectangle;

  // -- var control user
  keepInMinFix: boolean;

  // -- var control
  frameOnPan: boolean;
  panPointIni: Point;
  zoomPointMouse: Point;
  zoomPointTarget: Point;
  cssScale: number;
  resizeTimeout: any;
  valuesMinFix: ScaleAndPoint;
  valuesActual: ScaleAndPoint;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    if (this.el.nativeElement) {
      this.elementFrame = this.el.nativeElement;
    }
    this.valuesMinFix = {};
    this.valuesActual = {};
  }

  ngAfterViewInit() {
    if (this.el.nativeElement) {
      this.elementContent = this.el.nativeElement.childNodes[0];
      this.elementFrame = this.el.nativeElement;
      const intervalIni = setInterval((() => {
        if (this.elementContent !== undefined && this.elementContent.clientWidth > 0) {
          clearInterval(intervalIni);
          this.applyChanges(this.calculateMinFix());
        }
      }).bind(this), 500);
    }
  }



  // Region HostListener

  @HostListener('mousedown', ['$event']) onMouseDown(event: any) {
    this.starPan(event);
  }
  @HostListener('mouseup', ['$event']) onMouseUp(event: any) {
    this.stopPan(event);
  }
  @HostListener('mousemove', ['$event']) onMouseMove(event: any) {
    this.onPan(event);
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.onLeave();
  }
  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }
  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }
  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.mouseWheelFunc(event);
  }
  @HostListener('window:resize') onResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout((() => {
      this.resize();
    }).bind(this), 500);

  }
  // End Region HostListener


  private starPan(event: MouseEvent) {
    this.elementFrame.style.cursor = 'move';
    this.frameOnPan = true;
    this.panPointIni = { x: event.clientX, y: event.clientY };
  }
  private stopPan(event: any) {
    this.elementFrame.style.cursor = 'default';
    this.frameOnPan = false;
  }
  private onPan(event: MouseEvent) {
    if (this.frameOnPan) {
      const deltaX = this.panPointIni.x - event.clientX;
      const deltaY = this.panPointIni.y - event.clientY;
      let newX = this.valuesActual.pointTopLeft.x - deltaX;
      let newY = this.valuesActual.pointTopLeft.y - deltaY;

      // -- Check no exceds de limits
      if (this.valuesActual.cssScale === this.valuesMinFix.cssScale) {
        newX = Math.max(Math.min(newX, this.valuesMinFix.pointTopLeft.x), 0);
        newY = Math.max(Math.min(newY, this.valuesMinFix.pointTopLeft.y), 0);
      } else {
        // Si contenido es mas ancho que el frame
        if (this.rectContent.width * this.valuesActual.cssScale > this.rectFrame.width) {
          newX = Math.min(newX, 15);
          newX = Math.max(newX, this.rectFrame.width - (this.rectContent.width * this.valuesActual.cssScale) - 15);
        } else {
          newX = Math.max(newX, 0);
          newX = Math.min(newX, (this.rectFrame.width - (this.rectContent.width * this.valuesActual.cssScale)) / 2);
        }
        // si el contenido es mas alto que el frame
        if (this.rectContent.heigth * this.valuesActual.cssScale > this.rectFrame.heigth) {
          newY = Math.min(newY, 15);
          newY = Math.max(newY, this.rectFrame.heigth - (this.rectContent.heigth * this.valuesActual.cssScale) - 15);
        } else {
          newY = Math.max(newY, 0);
          newY = Math.min(newY, (this.rectFrame.heigth - (this.rectContent.heigth * this.valuesActual.cssScale)) / 2);
        }
      }

      this.applyChanges({
        cssScale: this.valuesActual.cssScale,
        pointTopLeft: {
          x: Math.round(newX),
          y: Math.round(newY)
        }
      });
      this.panPointIni = { x: event.clientX, y: event.clientY };
    }
  }
  private resize() {
    this.valuesMinFix = this.calculateMinFix();
    if (this.isMobileDevice()) {
      this.applyChanges(this.valuesMinFix);
    } else {
      if (this.valuesActual.cssScale < this.valuesMinFix.cssScale) {
        this.applyChanges(this.valuesMinFix);
      }
    }
  }
  private calculateMinFix(): ScaleAndPoint {
    this.rectFrame =  {
      width: this.elementFrame.clientWidth,
      heigth: this.elementFrame.clientHeight,
      orientation: this.elementFrame.clientWidth > this.elementFrame.clientHeight ? 'landscape' : 'portrait'
    } as Rectangle;
    this.rectContent =  {
      width: this.elementContent.clientWidth,
      heigth: this.elementContent.clientHeight,
      orientation: this.elementContent.clientWidth > this.elementContent.clientHeight ? 'landscape' : 'portrait',
      topLeft:  { x: 0, y: 0 } as Point
    } as Rectangle;

    if (this.rectFrame.orientation !== this.rectContent.orientation) {
      if (this.rectFrame.orientation === 'landscape') {
        this.valuesMinFix.cssScale = this.rectFrame.heigth / this.rectContent.heigth;
        this.valuesMinFix.pointTopLeft = {
          x: Math.abs((this.rectFrame.width - (this.rectContent.width * this.valuesMinFix.cssScale)) / 2),
          y: 0
        };
      } else {
        this.valuesMinFix.cssScale = this.rectFrame.width / this.rectContent.width;
        this.valuesMinFix.pointTopLeft = {
          x: 0,
          y: Math.abs((this.rectFrame.heigth - (this.rectContent.heigth * this.valuesMinFix.cssScale)) / 2)
        };
      }
    } else {
      if (this.rectFrame.heigth / this.rectContent.heigth < this.rectFrame.width / this.rectContent.width) {
        this.valuesMinFix.cssScale = this.rectFrame.heigth / this.rectContent.heigth;
        this.valuesMinFix.pointTopLeft = {
          x: Math.abs((this.rectFrame.width - (this.rectContent.width * this.valuesMinFix.cssScale)) / 2),
          y: 0
        };
      } else {
        this.valuesMinFix.cssScale = this.rectFrame.width / this.rectContent.width;
        this.valuesMinFix.pointTopLeft = {
          x: 0,
          y: Math.abs((this.rectFrame.heigth - (this.rectContent.heigth * this.valuesMinFix.cssScale)) / 2)
        };
      }
    }
    return this.valuesMinFix;
  }
  private onLeave() {
    this.elementFrame.style.cursor = 'default';
    this.frameOnPan = false;
    this.highlight(null);
  }
  private mouseWheelFunc(e: any) {
    // tslint:disable-next-line: deprecation
    e = window.event || e; // old IE support
    let newX = 0;
    let newY = 0;
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    const factor = 0.1 * delta;
    const oldScale = this.valuesActual.cssScale;
    const newScale = Math.max(this.valuesActual.cssScale + factor, this.valuesMinFix.cssScale);
    const xInTarget = e.pageX - this.elementFrame.offsetLeft - this.valuesActual.pointTopLeft.x;
    const yInTarget = e.pageY - this.elementFrame.offsetTop - this.valuesActual.pointTopLeft.y;
    if (newScale !== this.valuesMinFix.cssScale) {
      newX = this.valuesActual.pointTopLeft.x + (xInTarget - (xInTarget / oldScale * newScale));
      newY = this.valuesActual.pointTopLeft.y + (yInTarget - (yInTarget / oldScale * newScale));
    } else {
      const diffX = this.valuesActual.pointTopLeft.x - this.valuesMinFix.pointTopLeft.x;
      if (Math.abs(diffX) < 10) {
        newX = this.valuesMinFix.pointTopLeft.x;
      } else {
        newX = this.valuesActual.pointTopLeft.x - (diffX / 10);
      }
      const diffY = this.valuesActual.pointTopLeft.y - this.valuesMinFix.pointTopLeft.y;
      if (Math.abs(this.valuesActual.pointTopLeft.y) < 10) {
        newY = this.valuesMinFix.pointTopLeft.y;
      } else {
        newY = this.valuesActual.pointTopLeft.y - (diffY / 10);
      }
    }
    this.applyChanges({
      cssScale: newScale,
      pointTopLeft: {
        x: Math.round(newX),
        y: Math.round(newY)
      }
    });
    // for IE
    e.returnValue = false;
    // for Chrome and Firefox
    if (e.preventDefault) {
      e.preventDefault();
    }
  }
  private highlight(color: string) {
    this.elementFrame.style.backgroundColor = color;
  }
  private applyChanges(dataToApply: ScaleAndPoint) {
    let transformation = 'translate(' + (dataToApply.pointTopLeft.x) + 'px,' + (dataToApply.pointTopLeft.y) + 'px)';
    transformation += ' scale(' + dataToApply.cssScale + ')';
    this.elementContent.style.transformOrigin = '0px 0px 0px';
    this.elementContent.style.transform = transformation;
    this.valuesActual = {
      cssScale: dataToApply.cssScale,
      pointTopLeft: {
        x: dataToApply.pointTopLeft.x,
        y: dataToApply.pointTopLeft.y
      }
    };
    // ---  the  renderer not working ¿?!!  :-(
    // this.renderer.setProperty(this.elementContent, 'transform', transformation);
    // this.renderer.setProperty(this.elementContent, 'transform-origin', '0px 0px 0px');
    // this.renderer.setProperty(this.elementContent, 'transform', transformation);
  }

  private isMobileDevice(): boolean {
    // tslint:disable-next-line: deprecation
    return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }
}

interface Point {
  x: number;
  y: number;
}

interface ScaleAndPoint {
  cssScale?: number;
  pointTopLeft?: Point;
}

interface Rectangle {
  topLeft: Point;
  heigth: number;
  width: number;
  orientation?: string;
}

// /// <reference path="./chessboard.d.ts" />
// import { Component, Input, Output, OnInit, HostListener, EventEmitter } from '@angular/core';

// @Component({
//   selector: 'ng2-chessboard',
//   templateUrl: './chessboard.component.html',
//   styleUrls: ['./chessboard.component.css']
// })
// export class ChessboardComponent implements OnInit {

//   board: any;

//   private _position:      any     = 'start';
//   private _orientation:   Boolean = true;
//   private _showNotation:  Boolean = true;
//   private _draggable:     Boolean = false;
//   private _dropOffBoard:  string  = 'snapback';
//   private _pieceTheme:    any     = 'img/chesspieces/wikipedia/{piece}.png';
//   private _moveSpeed:     any     = 200;
//   private _snapbackSpeed: any     = 500;
//   private _snapSpeed:     any     = 100;
//   private _sparePieces:   Boolean = false;

//   @Input() animation: Boolean = true;
//   @Output() animationChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();

//   constructor() {}

//   // PARAMETERS

//   @HostListener('window:resize', ['$event'])
//   onResize(event){
//     if (this.board) this.board.resize(event);
//   }

//   @Input()
//   set position(value: any) {
//     this._position = value;
//     if (this.board) this.board.position(value, this.animation);
//   }

//   @Input()
//   set orientation(value: Boolean) {
//     this._orientation = value;
//     if(this.board) this.board.orientation(value ? 'white' : 'black');
//     this.orientationChange.emit(this._orientation);
//   }

//   @Input()
//   set showNotation(value: Boolean) {
//     this._showNotation = value;
//     if (this.board) this.load();
//     this.showNotationChange.emit(this._showNotation);
//   }

//   @Input()
//   set draggable(value: Boolean) {
//     this._draggable = value;
//     if(this.board) this.load();
//     this.draggableChange.emit(this._draggable);
//   }

//   @Input()
//   set dropOffBoard(value: string) {
//     this._dropOffBoard = value;
//     if(this.board) this.load();
//     this.dropOffBoardChange.emit(this._dropOffBoard);
//   }

//   @Input()
//   set pieceTheme(value: any) {
//     this._pieceTheme = value instanceof Function ? value() : value;
//     if(this.board) this.load();
//     this.pieceThemeChange.emit(this._pieceTheme);
//   }

//   @Input()
//   set moveSpeed(value: any) {
//     this._moveSpeed = value;
//     if(this.board) this.load();
//     this.moveSpeedChange.emit(this._moveSpeed);
//   }

//   @Input()
//   set snapbackSpeed(value: any) {
//     this._snapbackSpeed = value;
//     if(this.board) this.load();
//     this.snapbackSpeedChange.emit(this._snapbackSpeed);
//   }

//   @Input()
//   set snapSpeed(value: any) {
//     this._snapSpeed = value;
//     if(this.board) this.load();
//     this.snapSpeedChange.emit(this._snapSpeed);
//   }

//   @Input()
//   set sparePieces(value: Boolean) {
//     this._sparePieces = value;
//     if(this.board) this.load();
//     this.sparePiecesChange.emit(this._sparePieces);
//   }

//   get position():      any     { return this._position;      }
//   get orientation():   Boolean { return this._orientation;   }
//   get showNotation():  Boolean { return this._showNotation;  }
//   get draggable():     Boolean { return this._draggable;     }
//   get dropOffBoard():  string  { return this._dropOffBoard;  }
//   get pieceTheme():    any     { return this._pieceTheme;    }
//   get moveSpeed():     any     { return this._moveSpeed;     }
//   get snapbackSpeed(): any     { return this._snapbackSpeed; }
//   get snapSpeed():     any     { return this._snapSpeed;     }
//   get sparePieces():   Boolean { return this._sparePieces;   }

//   @Output() positionChange:      EventEmitter<any>     = new EventEmitter<any>();
//   @Output() orientationChange:   EventEmitter<Boolean> = new EventEmitter<Boolean>();
//   @Output() showNotationChange:  EventEmitter<Boolean> = new EventEmitter<Boolean>();
//   @Output() draggableChange:     EventEmitter<Boolean> = new EventEmitter<Boolean>();
//   @Output() dropOffBoardChange:  EventEmitter<string>  = new EventEmitter<string>();
//   @Output() pieceThemeChange:    EventEmitter<any>     = new EventEmitter<any>();
//   @Output() moveSpeedChange:     EventEmitter<any>     = new EventEmitter<any>();
//   @Output() snapbackSpeedChange: EventEmitter<any>     = new EventEmitter<any>();
//   @Output() snapSpeedChange:     EventEmitter<any>     = new EventEmitter<any>();
//   @Output() sparePiecesChange:   EventEmitter<Boolean> = new EventEmitter<Boolean>();

//   // METHODS

//   public clear() {
//     this.board.clear(this.animation);
//   }

//   public move(notation: string) {
//     this.board.move(notation);
//   }

//   // EVENTS

//   @Output() change:      EventEmitter<Object> = new EventEmitter<Object>();
//   @Output() dragStart:   EventEmitter<Object> = new EventEmitter<Object>();
//   @Output() dragMove:    EventEmitter<Object> = new EventEmitter<Object>();
//   @Output() drop:        EventEmitter<Object> = new EventEmitter<Object>();
//   @Output() snapbackEnd: EventEmitter<Object> = new EventEmitter<Object>();
//   @Output() moveEnd:     EventEmitter<Object> = new EventEmitter<Object>();

//   private onChangeHandler(oldPos: any, newPos: any) {
//     this.change.emit({oldPos, newPos});
//   }

//   private onDragStart(source: string, piece: string, position: any, orientation: string) {
//     this.dragStart.emit({source, piece, position, orientation});
//   }

//   private onDragMove(newLocation: any, oldLocation: any, source: string, piece: string, position: any, orientation: string) {
//     this.dragMove.emit({newLocation, oldLocation, source, piece, position, orientation});
//   }

//   private onDrop(source: string, target: string, piece: string, newPos: any, oldPos: any, orientation: string) {
//     this._position = newPos;
//     this.positionChange.emit(this._position);
//     this.drop.emit({source, target, piece, newPos, oldPos, orientation});
//   }

//   private onSnapbackEnd(piece: string, square: string, position: any, orientation: string) {
//     this.snapbackEnd.emit({piece, square, position, orientation});
//   }

//   private onMoveEnd(oldPos: any, newPos: any) {
//     this._position = newPos;
//     this.positionChange.emit(this._position);
//     this.moveEnd.emit({oldPos, newPos});
//   }

//   private load() {
//     this.board = ChessBoard('ng2-board', {
//       'position': this._position,
//       'orientation': this._orientation ? 'white' : 'black',
//       'showNotation': this._showNotation,
//       'draggable': this._draggable,
//       'dropOffBoard': this._dropOffBoard,
//       'pieceTheme': this._pieceTheme,
//       'moveSpeed': this._moveSpeed,
//       'snapbackSpeed': this._snapbackSpeed,
//       'snapSpeed': this._snapSpeed,
//       'sparePieces': this._sparePieces,

//       'onDragStart': this.onDragStart.bind(this),
//       'onChange': this.onChangeHandler.bind(this),
//       'onDragMove': this.onDragMove.bind(this),
//       'onDrop': this.onDrop.bind(this),
//       'onSnapbackEnd': this.onSnapbackEnd.bind(this),
//       'onMoveEnd': this.onMoveEnd.bind(this)
//     });
//   }

//   ngOnInit() {
//     this.load();
//   }

// }
