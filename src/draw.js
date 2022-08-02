import React, { Component } from 'react';
import { v4 } from 'uuid';
import Pusher from 'pusher-js';
import { Fragment } from 'react';
import TitleLogin from './titlelogin';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.stateNum = {
      x: 5,
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.colorChange = this.colorChange.bind(this);

    this.pusher = new Pusher("a32b1539a5f038aec122", {
      cluster: 'us2',
    });
  }
  isPainting = false;
  userStrokeStyle = '#15803D';
  guestStrokeStyle = '#FFFFFF';
  line = [];
  userId = v4();
  prevPos = { offsetX: 0, offsetY: 0 };

  onMouseDown({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    this.isPainting = true;
    this.prevPos = { offsetX, offsetY };
  }

  onMouseMove({ nativeEvent }) {
    if (this.isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      this.position = {
        start: { ...this.prevPos },
        stop: { ...offSetData },
      };
      this.line = this.line.concat(this.position);
      this.paint(this.prevPos, offSetData, this.userStrokeStyle);
    }
  }

  paint(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  }
  
  endPaintEvent() {
    if (this.isPainting) {
      this.isPainting = false;
      this.sendPaintData();
    }
  }

  async sendPaintData() {
    const body = {
      line: this.line,
      userId: this.userId,
    };

    const response = await fetch('http://localhost:5000/paint', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log('Paint data sent: ', data);
    this.line = [];
}

  componentDidMount() {
    this.canvas.width = window.innerWidth - 20;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;

    const channel = this.pusher.subscribe('painting');
    channel.bind('draw', (data) => {
      const { userId, line } = data;
      if (userId !== this.userId) {
        line.forEach((pos) => {
          this.paint(pos.start, pos.stop, this.guestStrokeStyle);
        });
      }
    });
  }
  
  handleChange(e) {
    <>
    this.setState({this.ctx.lineWidth = e.target.value});
    this.setState({this.stateNum.x = e.target.value});
    </>
    const newStateNum = {
      x: e.target.value,
    };
    this.setState(newStateNum);
  }

  colorChange(e) {
    <>
    this.setState({this.userStrokeStyle = e});
    </>
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  downloadCanvas() {
    if (document.getElementById('user-online')) {
      const link = document.createElement('a');
      link.download = 'yourdrawing.png';
      link.href = this.canvas.toDataURL();
      link.click();
    }
    else {
      alert('You must be logged in to use this feature!');
    }
  }

  render() {
    return (
      <Fragment>
      <TitleLogin />     
      <div className='flex flex-row gap-1'>
        {(document.getElementById('user-online')) ? (
        <>
        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => this.colorChange('#15803D')}>Green</button>
        <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => this.colorChange('#B91C1C')}>Red</button>
        <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => this.colorChange('#7E22CE')}>Purple</button>
        <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900" onClick={() => this.colorChange('#FACC15')}>Yellow</button>
        <button type="button" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900" onClick={() => this.colorChange('#0F3CFF')}>Blue</button>
        <button type="button" className="focus:outline-none text-white bg-[#FF9100] hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900" onClick={() => this.colorChange('#FF9100')}>Orange</button>
        <button type="button" className="focus:outline-none text-white bg-[#FF00FF] hover:bg-pink-400 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-900" onClick={() => this.colorChange('#FF00FF')}>Pink</button>
        <button type="button" className="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900" onClick={() => this.colorChange('#3F51B5')}>Indigo</button>
        <button type="button" className="focus:outline-none text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-900" onClick={() => this.colorChange('#00BCD4')}>Cyan</button>
        <button type="button" className="focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900" onClick={() => this.colorChange('#9E9E9E')}>Gray</button>
        </>
        ) : (
        <>
        <button type="button" className="focus:outline-none text-white bg-[#FF9100] hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900" onClick={() => this.colorChange('#FF9100')}>Orange</button>
        <button type="button" className="focus:outline-none text-white bg-[#FF00FF] hover:bg-pink-400 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-900" onClick={() => this.colorChange('#FF00FF')}>Pink</button>
        <button type="button" className="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900" onClick={() => this.colorChange('#3F51B5')}>Indigo</button>
        <button type="button" className="focus:outline-none text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-900" onClick={() => this.colorChange('#00BCD4')}>Cyan</button>
        <button type="button" className="focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900" onClick={() => this.colorChange('#9E9E9E')}>Gray</button>
        </>
        )}
      </div>
      <div className='text-center'>
          <div className='font-bold text-sm'>{'Brush Width: ' + this.stateNum.x}</div>
          <input type="range" min="1" max="10" step="1" defaultValue={this.stateNum.x} onChange={(e) => this.handleChange(e)} />
      </div>
      <div className='flex flex-row justify-center gap-1'>
        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={() => this.downloadCanvas()}>Download</button>
        <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => this.clearCanvas()}>Clear</button>
      </div>
        <canvas className='mb-10'
          ref={(ref) => (this.canvas = ref)}
          style={{ background: 'black' }}
          onMouseDown={this.onMouseDown}
          onMouseLeave={this.endPaintEvent}
          onMouseUp={this.endPaintEvent}
          onMouseMove={this.onMouseMove}
        />
      </Fragment>
    );
  }
}

export default Canvas;