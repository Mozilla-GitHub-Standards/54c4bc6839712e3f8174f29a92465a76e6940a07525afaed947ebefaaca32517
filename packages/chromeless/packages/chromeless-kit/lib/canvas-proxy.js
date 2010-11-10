/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim:set ts=2 sw=2 sts=2 et: */
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Jetpack.
 *
 * The Initial Developer of the Original Code is
 * the Mozilla Foundation.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Marcio Galli <mgalli@mgalli.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

const {Cc, Ci} = require("chrome");

const XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
const XHTML_NS ="http://www.w3.org/1999/xhtml";


/* This module should become more flexible so developer 
   should be able to do various type of operations with canvas
   over the browser references, to render in various sizes, 
   and also to deal with the browser - send mouse and keyboard  
   events */ 

exports.snapshot = function Snapshot(frame) {

  var window = frame.contentWindow;
  var thumbnail = window.document.createElementNS(XHTML_NS, "canvas");
  thumbnail.mozOpaque = true;
  thumbnail.width=64;
  thumbnail.height = 64;
  var ctx = thumbnail.getContext("2d");
  var snippetWidth=320;
  var scale = thumbnail.width / snippetWidth;
  var aspectRatio = 0.5625; // 16:9
  ctx.scale(scale, scale);
  ctx.drawWindow(window, window.scrollX, window.scrollY, snippetWidth, snippetWidth * aspectRatio, "rgb(255,255,255)");
  return thumbnail.toDataURL("image/png");

}

/* backup 
  var window = frame.contentWindow;
  var thumbnail = window.document.createElementNS(XHTML_NS, "canvas");
  thumbnail.mozOpaque = true;
  thumbnail.width = Math.ceil(window.screen.availWidth / 4.75);
  var aspectRatio = 0.5625; // 16:9
  thumbnail.height = Math.round(thumbnail.width * aspectRatio);
  var ctx = thumbnail.getContext("2d");
  
  //var snippetWidth = window.innerWidth * .6;  var snippetWidth=64;
  var scale = thumbnail.width / snippetWidth;
  ctx.scale(scale, scale);
  ctx.drawWindow(window, window.scrollX, window.scrollY, snippetWidth, snippetWi
dth * aspectRatio, "rgb(255,255,255)");
  return thumbnail;

*/
