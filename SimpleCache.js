/*
SimpleCache.js
Useful and tiny library to provide cache for html5 applications
Contact : Neferetheka[at]gmail.com
Copyright (C) 2012  Aerilys

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/
function Cache(){
	var self = this;

	/*
	*Call it just once. Return null on old browsers. Size in bytes
	*/
	self.initDB =function(dbName, version, size){
		if(!self.isDBSupported())
			return null;
		openDatabase(dbName, version, dbName, size);
	}

	/*
	*try/catch tip to check if localstorage is supported by browser
	*/
	self.isDBSupported = function(){
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}
	
	/*
	*Get an item from cache. Remove it and return null if cache has expired.
	*/
	self.getItem = function (key){

		if(localStorage.getItem(key+"cache")){
			var cacheTime = parseInt(localStorage.getItem(key+"cache"));
			if(cacheTime < self.getTS()){
				localStorage.removeItem(key);
				localStorage.removeItem(key+"cache");
				return null;
			}
		}

		if(localStorage. getItem(key))
			return localStorage.getItem(key);
		else
			return null;
	}

	/*
	*Set an item within cache. cacheTime in seconds
	*/
	self.setItem = function (key, value, cacheTime){
		var TSEndCache = parseInt(cacheTime)+self.getTS();
		localStorage.setItem(key, value);
		localStorage.setItem(key+"cache", TSEndCache);
	}
	
	/*
	* function to get the UNIX Timestamp. Permits to manage cache expiration
	*/
	self.getTS = function(){
		return Math.round(new Date().getTime()/1000);
	}
}