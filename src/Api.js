export const Api = (route) => {

    let _method = 'get';
    let _headers = {};
    let _callback = ()=>1;
    let _getParams = '';
    let _postJson = null;
    let _ontimeout = () => 1;
    let _timeout_secs = 3;

    let makeObject = () => {
        return Object.freeze({
            get,
            post,
            auth,
            callback,
            timeout,
            headers,
            send,
            img,
            imgUpload,
            cssimg
        });
    };

    let host = () => {
        return document.querySelector("[data-api-host]").dataset.apiHost;
    }

    let img = name => {
        return `${host()}/img.get?file=${name}`;
    }

    let cssimg = name => {
        return `url(${host()}/img.get?file=${name})`;
    }

    let imgUpload = (name, ref) => {
        _method = 'post';
        let form = new FormData();
        form.set(name, ref.current.files[0]);
        _postJson = form;
        return makeObject();
    }

    let get = (params) => {
        _method = 'get';
        if(params !== undefined) {
            let temp = [];
            for(let i in params) {
                temp.push(`${i}=${params[i]}`);
            }
            _getParams = `?${temp.join('&')}`;
        }
        return makeObject();
    };

    let post = (obj) => {  
        _method = 'post';
        _postJson = JSON.stringify(obj);
        _headers['Content-Type'] = 'application/json';
        return makeObject();
    };

    let callback = (fn) => {
        _callback = fn;
        return makeObject();
    };

    let timeout = (fn, secs = 3) => {
        _ontimeout = fn;
        _timeout_secs = secs;
        return makeObject();
    }

    let send = async () => {
        let timer = setTimeout(_ontimeout, _timeout_secs*1000);
        let fetchParams = {
            method: _method,
            headers: _headers
        };
        if(_method === 'post') {
            fetchParams.body = _postJson;
        }
        try {
            let promise = await fetch(host()+route+_getParams, fetchParams);
            let response = undefined;
            response = await promise.json();
            clearTimeout(timer);
            _callback({ok: promise.ok, status: promise.status, data: response});
        }
        catch (err) {
            _callback({ok: false, status: undefined, data: undefined, error: err})
            console.log(err, route);
        }
    };

    let auth = () => {
        let token = localStorage.getItem('Authorization');
        if(token !== null) {
            _headers['Authorization'] = `Bearer ${token}`;
        }
        return makeObject();
    };

    let headers = (obj) => {
        for(let i in obj) {
            _headers[i] = obj[i];
        }
        return makeObject();
    };

    return makeObject();
};