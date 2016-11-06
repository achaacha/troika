import React from 'react'
import {
  Canvas3D,
  Group,
  Object3D,
  HtmlOverlay
} from '../../src/index'
import {
  BoxBufferGeometry,
  SphereBufferGeometry,
  Mesh,
  MeshPhongMaterial,
  DoubleSide
} from 'three'


class Box extends Object3D {
  constructor(parent) {
    super(parent, new Mesh(
      new BoxBufferGeometry(40, 40, 40),
      new MeshPhongMaterial({
        color: 0x003300,
        opacity: 0.6,
        side: DoubleSide,
        transparent: true
      })
    ))
  }
}

class Dot extends Object3D {
  constructor(parent) {
    super(parent, new Mesh(
      new SphereBufferGeometry(1),
      new MeshPhongMaterial({
        color: 0x993333
      })
    ))
  }
}



export default React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },


  render() {
    let state = this.state
    let {width, height} = this.props
    return (
      <div>
        <style type="text/css">{ `
          .tip {
            background: #111;
            color: #eee;
            box-shadow: 0 0 2px #000;
            transform: translate(-50%,calc(-100% - 10px));
            padding: 5px 10px;
            border-radius: 3px;
          }
          .tip::after {
            content: "";
            position: absolute;
            left: calc(50% - 10px);
            top: 100%;
            border: 10px solid transparent;
            border-top-color: #111;
          }
        ` }</style>

        <Canvas3D
          antialias
          width={ width }
          height={ height }
          lights={ [
            { type: 'ambient', color: 0x666666 },
            { type: 'point', color: 0xffffff, x: 1000, z: 1000 },
            { type: 'point', color: 0xffffff, x: -1000, z: 1000 },
          ] }
          camera={ {
            z: 400,
          } }
          objects={ {
            key: 'main',
            class: Group,
            children: {
              key: 'boxes',
              class: Group,
              children: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map((num, i, arr) => {
                let angle = Math.PI * 2 * i / arr.length
                return {
                  key: i,
                  class: Box,
                  x: Math.cos(angle) * 100,
                  y: Math.sin(angle) * 100,
                  rotateZ: angle,
                  animation: {
                    from: {rotateX: 0},
                    to: {rotateX: Math.PI},
                    duration: 3000,
                    delay: i * 200,
                    easing: 'easeInOutCubic',
                    direction: 'alternate',
                    iterations: Infinity
                  },
                  children: [
                    {
                      key: 'dot',
                      class: Dot,
                      x: 20,
                      y: 20,
                      z: 20
                    },
                    {
                      key: 'html',
                      class: HtmlOverlay,
                      x: 20,
                      y: 20,
                      z: 20,
                      html: (
                        <div className="tip">
                          Object Number {num}
                        </div>
                      )
                    }
                  ]
                }
              }),
              animation: {
                from: {rotateZ: 0},
                to: {rotateZ: Math.PI * 2},
                duration: 6000,
                easing: 'easeInOutCubic',
                direction: 'alternate',
                iterations: Infinity
              }
            },
            animation: {
              from: {rotateY: 0},
              to: {rotateY: Math.PI * 2},
              duration: 10000,
              iterations: Infinity
            }
          } }
        />

        <div className="example_desc">
          <p>This example uses the <b>HtmlOverlay</b> facade to define tooltips that are anchored to a corner of each box. Their HTML contents are rendered into the DOM, fully styleable, and synchronized to the position of their anchor point in the 3D world as projected to the camera.</p>
        </div>

        <div className="example_controls">
        </div>
      </div>
    )
  }
})

