using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend2.Models;
namespace Backend2.Controllers
{
    public class Calc : Controller
    {
        public IActionResult Manual()
        {
            if (Request.Method == "POST")
            {
                Actions actions = new Actions();
                actions.val1 = Request.Form["val1"];
                actions.val2 = Request.Form["val2"];
                actions.oper = Request.Form["oper"];
                int x;
                if (int.TryParse(actions.val1, out x) && int.TryParse(actions.val2, out x))
                    ViewBag.Result = actions.getResult();
                else ViewBag.Result = "Nulls Components Exists";
                return View("Result");
            }
            else
                return View();
        }
        [HttpGet]
        public IActionResult ManualWithSeparateHandlers()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ManualWithSeparateHandlers(string str)
        {
            Actions actions = new Actions();
            actions.val1 = Request.Form["val1"];
            actions.val2 = Request.Form["val2"];
            actions.oper = Request.Form["oper"];
            int x;
            if (int.TryParse(actions.val1, out x) && int.TryParse(actions.val2, out x))
                ViewBag.Result = actions.getResult();
            else ViewBag.Result = "Nulls Components Exists";
            return View("Result");
        }
        [HttpPost]
        public IActionResult ModelBindingInParameters(string val1, string val2, string oper)
        {
            Actions  actions= new Actions();
            actions.val1 = val1;
            actions.val2 = val2;
            actions.oper = oper;
            int x;
            if (int.TryParse(actions.val1, out x) && int.TryParse(actions.val2, out x))
                ViewBag.Result = actions.getResultModel();
            else ViewBag.Result = "Nulls Components Exists";
            return View("Result");
        }
        [HttpGet]
        public IActionResult ModelBindingInParameters()
        {
            return View();
        }
        [HttpPost]
        public IActionResult ModelBindingInSeparateModel(Actions actions)
        {
            int x;
            if (int.TryParse(actions.val1, out x) && int.TryParse(actions.val2, out x))
                ViewBag.Result = actions.getResultModel();
            else ViewBag.Result = "Nulls Components Exists";
            return View("Result");
        }
        [HttpGet]
        public IActionResult ModelBindingInSeparateModel()
        {
            return View();
        }
    }
}
