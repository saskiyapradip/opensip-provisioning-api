import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { config } from "../../config";
import axios from "axios";
import REGEXP from "../../regexp";
import add_registrant_detail from "../../helper/sql_registrant";
import add_registrant_detail_update from "../../helper/sql_registrant_update";
import remove_register_user_detail from "../../helper/sql_registrant_remove";

import OpensipsRealod from "../../helper/opensipsReload";
import add_pbx_server_details from "../../helper/sql_add_pbx_server_details";
import add_dispatcher from "../../helper/sql_add_dispatcher";
import add_domain from "../../helper/sql_add_domain";
import upsertSubscriberAndRegistrant from "../../helper/upsertSubscriberAndRegistrant";
import edit_dispatcher from "../../helper/edit_dispatcher";
import edit_pbx_server_details from "../../helper/edit_pbx_server_details";
import delete_dispatcher from "../../helper/delete_dispatcher";
import delete_domain from "../../helper/delete_domain";
import delete_pbx_server_details from "../../helper/delete_pbx_server_details";

const source = axios.CancelToken.source();

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("req", req.body)
    let data: any = req.body;
    let password: any = data.password;
    let endpointNumber: any = data.endpointNumber;
    let sipDomain: any = data.sipDomain;

    let SecondoryipAddress: any = data.SecondoryipAddress;
    let SecondoryPort: any = data.SecondoryPort;
    let ipAddress: any = data.ipAddress;
    let enterprise_id: any = data.enterprise_id;
    let Port: any = data.Port;

    if (!password) {
      return res.status(403).send({
        success: 0,
        message: "password is mandatory",
      });
    }

    if (!endpointNumber) {
      return res.status(403).send({
        success: 0,
        message: "endpointNumber is mandatory",
      });
    }

    if (!sipDomain) {
      return res.status(403).send({
        success: 0,
        message: "sipDomain is mandatory",
      });
    }

    if (!REGEXP.USER.password.test(password)) {
      return res.status(403).send({
        success: 0,
        message: "password Id is invalid",
      });
    }

    if (!REGEXP.USER.endpointNumber.test(data.endpointNumber)) {
      return res.status(403).send({
        success: 0,
        message: "Endpoint Number is invalid",
      });
    }

    // if (!REGEXP.ENTERPRISE.SIP_DOMAIN_MTC.test(sipDomain)) {
    //   return res.status(403).send({
    //     success: 0,
    //     message: "sipDomain is invalid",
    //   });
    // }

    let post: any = {};
    post.password = password;
    post.endpointNumber = endpointNumber;
    post.sipDomain = sipDomain;

    await add_registrant_detail(
      post,
      post.endpointNumber,
      ipAddress,
      Port,
      SecondoryipAddress,
      SecondoryPort,
    );

    await OpensipsRealod();

    return res.status(201).send({
      success: 1,
      message: "Add User Successfully",
      UserDetail: post,
    });
  } catch (error) {
    res.status(500).send({
      success: 0,
      message: "Internal Server Error",
    });
  }
};

const editUserbyUid = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let data: any = req.body;

    if (!data.password) {
      return res.status(403).send({
        success: 0,
        message: "password is mandatory",
      });
    }

    if (!data.endpointNumber) {
      return res.status(403).send({
        success: 0,
        message: "endpointNumber is mandatory",
      });
    }

    if (!data.sipDomain) {
      return res.status(403).send({
        success: 0,
        message: "sipDomain is mandatory",
      });
    }

    if (!REGEXP.USER.password.test(data.password)) {
      return res.status(403).send({
        success: 0,
        message: "password Id is invalid",
      });
    }

    if (!REGEXP.USER.endpointNumber.test(data.endpointNumber)) {
      return res.status(403).send({
        success: 0,
        message: "Endpoint Number is invalid",
      });
    }

    if (!REGEXP.ENTERPRISE.SIP_DOMAIN_MTC.test(data.sipDomain)) {
      return res.status(403).send({
        success: 0,
        message: "sipDomain is invalid",
      });
    }
    let upate_user_detail:any = {
      endpointNumber:data.endpointNumber,
      sipDomain:data.sipDomain,
      password:data.password
    }
    console.log("before call SQL function")
    await add_registrant_detail_update(
      upate_user_detail,
      data.endpointNumber,
      data.ipAddress,
      data.Port,
      data.SecondoryipAddress,
      data.SecondoryPort,
    );
    await OpensipsRealod();

    return res.status(201).send({
      success: 1,
      message: "User Detail Updated Successfully",
      UserDetail: upate_user_detail,
    });
  } catch (error) {
    res.status(500).send({
      success: 0,
      message: "Internal Server Error",
    });
  }
};

const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let data: any = req.body;
    let deleted_user:any = {
      sipDomain:data.sipDomain,
      password:data.password,
      endpointNumber:data.endpointNumber
    }
    await remove_register_user_detail(deleted_user);
    await OpensipsRealod();

    return res.status(201).send({
      success: 1,
      message: "User Deleted Successfully"
    });
  } catch (error) {
    res.status(500).send({
      success: 0,
      message: "Internal Server Error",
    });
  }
};

const addDetail = async(
  req: Request,
  res: Response,
  next: NextFunction,
)=>{
  try {
    // excpeted body ={
    // enterprice_name:data.enterprice_name,
    //   domain_name : data.domain_name,
    //   primary_server_ip :data.primary_server_ip ,
    //   primary_server_port:data.primary_server_port ,
    //   secondary_server_ip:data.secondary_server_ip ,
    //   secondary_server_port:data.secondary_server_port ,
    //   is_enabled:data.is_enabled,
    //   realm_primary:data.realm_primary ,
    //   destination:destination,
    //   attr:attr
    // }

    let data: any = req.body;
    let pbxdetaildata:any = {
      enterprice_name:data.enterprice_name,
      domain_name : data.domain_name,
      primary_server_ip :data.primary_server_ip ,
      primary_server_port:data.primary_server_port ,
      secondary_server_ip:data.secondary_server_ip ,
      secondary_server_port:data.secondary_server_port ,
      is_enabled:data.is_enabled,
      realm_primary:data.domain_name,
    }
    const destination = `sip:${data.primary_server_ip}:${data.primary_server_port}`
    const pbxserverdetails = await add_pbx_server_details(pbxdetaildata)
    const addeddispature = await add_dispatcher(data.setid,destination)
    const addedDomain = await add_domain(data.domain_name,data.attr)
    console.log(addedDomain,addeddispature,pbxserverdetails,"addedDomain,addeddispature,pbxserverdetails,")
    return res.status(201).send({
      success: 1,
      message: "Add Data Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: 0,
      message: "Internal Server Error",
    });
  }
}

const EditDomainDetail = async(
  req: Request,
  res: Response,
  next: NextFunction,
)=>{
  try {
    let data: any = req.body;
    let pbxdetaildata:any = {
      enterprice_name:data.enterprice_name,
      domain_name : data.domain_name,
      primary_server_port:data.primary_server_port,
      primary_server_port_old:data.primary_server_port_old,
      secondary_server_port:data.secondary_server_port
    }
    const destination = `sip:${data.domain_name}:${data.primary_server_port}`
    const old_destination = `sip:${data.domain_name}:${data.primary_server_port_old}`
    const pbxserverdetails = await edit_pbx_server_details(pbxdetaildata)
    const editedispature = await edit_dispatcher(destination,old_destination)
    console.log(editedispature,pbxserverdetails,"editedispature,pbxserverdetails,")
    return res.status(201).send({
      success: 1,
      message: "Edit Data Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: 0,
      message: "Internal Server Error",
    });
  }
}

const upsertDataDomainandExtention = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      endpointNumber,
      password,
      sipDomain,
      ipAddress,
      Port
    } = req.body;
    console.log("body",req.body)
    if (!endpointNumber || !password || !sipDomain) {
      return res.status(400).send({
        success: 0,
        message: "endpointNumber, password and sipDomain are required"
      });
    }

    await add_domain(sipDomain);

    const result = await upsertSubscriberAndRegistrant(
      {
        endpointNumber,
        password,
        sipDomain
      },
      ipAddress,
      Port
    );

    await OpensipsRealod();

    return res.status(201).send({
      success: 1,
      message: "User processed successfully",
      // data: result
    });

  } catch (error: any) {
    return res.status(500).send({
      success: 0,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const DeleteDomainDetail = async(
  req: Request,
  res: Response,
  next: NextFunction,
)=>{
  try {
    let data: any = req.body;
    let pbxdetaildata:any = {
      domain_name : data.domain_name,
      primary_server_port:data.primary_server_port
    }
    const destination = `sip:${data.domain_name}:${data.primary_server_port}`
    const pbxserverdetails = await delete_pbx_server_details(pbxdetaildata)
    const deletedispature = await delete_dispatcher(destination)
     const deleteDomain = await delete_domain(data.domain_name)
    console.log(deletedispature,pbxserverdetails,deleteDomain,"deletedispature,pbxserverdetails,deleteDomain")
    return res.status(201).send({
      success: 1,
      message: "Delete Data Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: 0,
      message: "Internal Server Error",
    });
  }
}
export default {
  create,
  // getUserDetailUid,
  editUserbyUid,
  deleteUserById,
  addDetail,
  upsertDataDomainandExtention,
  EditDomainDetail,
  DeleteDomainDetail
};
